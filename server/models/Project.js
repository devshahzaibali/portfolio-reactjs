import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: ['mobile-app', 'web-app', 'full-stack', 'ui-ux', 'other'],
    default: 'mobile-app'
  },
  platform: {
    type: String,
    enum: ['ios', 'android', 'cross-platform', 'web', 'desktop'],
    default: 'cross-platform'
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned', 'archived'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    caption: String
  }],
  demoUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  githubUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?github\.com\/.+/, 'Please enter a valid GitHub URL']
  },
  playstoreUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/play\.google\.com\/.+/, 'Please enter a valid Play Store URL']
  },
  appstoreUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/apps\.apple\.com\/.+/, 'Please enter a valid App Store URL']
  },
  client: {
    name: String,
    company: String,
    testimonial: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  features: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: String
  }],
  challenges: [{
    problem: {
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    }
  }],
  metrics: {
    downloads: Number,
    rating: Number,
    users: Number,
    performanceImprovement: String
  },
  duration: {
    start: Date,
    end: Date,
    totalWeeks: Number
  },
  teamSize: {
    type: Number,
    min: 1,
    default: 1
  },
  myRole: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
projectSchema.index({ category: 1, featured: -1, priority: -1 });
projectSchema.index({ status: 1, createdAt: -1 });
projectSchema.index({ technologies: 1 });
projectSchema.index({ tags: 1 });

// Virtual for project duration in human readable format
projectSchema.virtual('durationText').get(function() {
  if (this.duration.start && this.duration.end) {
    const start = new Date(this.duration.start);
    const end = new Date(this.duration.end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    
    if (weeks > 0) {
      return days > 0 ? `${weeks} weeks, ${days} days` : `${weeks} weeks`;
    }
    return `${days} days`;
  }
  return this.duration.totalWeeks ? `${this.duration.totalWeeks} weeks` : 'Duration not specified';
});

// Virtual for main image
projectSchema.virtual('mainImage').get(function() {
  return this.images && this.images.length > 0 ? this.images[0] : null;
});

// Static method to get featured projects
projectSchema.statics.getFeatured = function() {
  return this.find({ featured: true, status: 'completed' })
    .sort({ priority: -1, createdAt: -1 })
    .limit(6);
};

// Static method to get projects by category
projectSchema.statics.getByCategory = function(category) {
  return this.find({ category, status: 'completed' })
    .sort({ priority: -1, createdAt: -1 });
};

export default mongoose.model('Project', projectSchema);