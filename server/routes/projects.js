import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET /api/projects - Get all projects with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      status = 'completed', 
      page = 1, 
      limit = 12,
      sort = '-priority'
    } = req.query;

    // Build query
    const query = { status };
    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured === 'true';

    // Execute query with pagination
    const projects = await Project.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('client', 'name company rating');

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      projects,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

// GET /api/projects/featured - Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.getFeatured();
    
    res.json({
      success: true,
      projects
    });
  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured projects'
    });
  }
});

// GET /api/projects/categories - Get projects grouped by category
router.get('/categories', async (req, res) => {
  try {
    const categories = await Project.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          projects: { 
            $push: {
              _id: '$_id',
              title: '$title',
              shortDescription: '$shortDescription',
              technologies: '$technologies',
              mainImage: { $arrayElemAt: ['$images', 0] },
              featured: '$featured',
              priority: '$priority'
            }
          }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project categories'
    });
  }
});

// GET /api/projects/stats - Get project statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          completedProjects: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          featuredProjects: {
            $sum: { $cond: ['$featured', 1, 0] }
          },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          avgRating: { $avg: '$client.rating' },
          technologies: { $addToSet: '$technologies' }
        }
      },
      {
        $project: {
          _id: 0,
          totalProjects: 1,
          completedProjects: 1,
          featuredProjects: 1,
          totalViews: 1,
          totalLikes: 1,
          avgRating: { $round: ['$avgRating', 1] },
          uniqueTechnologies: { $size: { $reduce: {
            input: '$technologies',
            initialValue: [],
            in: { $setUnion: ['$$value', '$$this'] }
          }}}
        }
      }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        totalProjects: 0,
        completedProjects: 0,
        featuredProjects: 0,
        totalViews: 0,
        totalLikes: 0,
        avgRating: 0,
        uniqueTechnologies: 0
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project statistics'
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Increment view count
    project.views = (project.views || 0) + 1;
    await project.save();

    res.json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
});

// POST /api/projects/:id/like - Like a project
router.post('/:id/like', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.likes = (project.likes || 0) + 1;
    await project.save();

    res.json({
      success: true,
      message: 'Project liked successfully',
      likes: project.likes
    });
  } catch (error) {
    console.error('Like project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like project'
    });
  }
});

// GET /api/projects/search/:query - Search projects
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const searchQuery = {
      $and: [
        { status: 'completed' },
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { technologies: { $in: [new RegExp(query, 'i')] } },
            { tags: { $in: [new RegExp(query, 'i')] } },
            { 'client.company': { $regex: query, $options: 'i' } }
          ]
        }
      ]
    };

    const projects = await Project.find(searchQuery)
      .sort({ priority: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Project.countDocuments(searchQuery);

    res.json({
      success: true,
      projects,
      query,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Search projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search projects'
    });
  }
});

export default router;