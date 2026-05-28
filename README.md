# IBM Succession Planning Dashboard - Interactive Demo

## Overview

This is a fully functional HTML/CSS/JavaScript demo of the IBM Succession Planning Dashboard. It showcases the "art of the possible" with realistic sample data and interactive features.

## Features

### 5 Interactive Dashboard Views

1. **Executive Overview** - High-level succession health metrics
   - Overall coverage KPIs
   - Coverage by business group chart
   - Pipeline health trend
   - Critical roles requiring attention

2. **Role Details** - Deep dive into individual role succession plans
   - Role search functionality
   - Succession pipeline visualization (Ready Now, 1-2 Years, 3+ Years)
   - Candidate cards with readiness scores
   - Development needs analysis

3. **Business Groups** - Organizational unit analysis
   - Practice-level metrics
   - Succession health by practice table
   - Pipeline distribution chart

4. **High Flyers** - Talent pool identification
   - Employees identified for multiple roles
   - High flyer list with details
   - Spotlight on top performers

5. **Gap Analysis** - Risk identification and management
   - Critical gaps (no candidates)
   - Inverted funnels
   - Risk distribution by business group

### Interactive Features

- ✅ Tab navigation between views
- ✅ Interactive charts (hover for details)
- ✅ Filter dropdowns (business group, band level)
- ✅ Search functionality
- ✅ Responsive design (works on desktop, tablet, mobile)
- ✅ IBM Design System styling
- ✅ Smooth animations and transitions

## How to Use

### Option 1: Open Directly in Browser

Simply double-click `index.html` or drag it into your browser.

### Option 2: Use a Local Server (Recommended)

For the best experience, serve the files using a local web server:

**Using Python:**
```bash
# Python 3
cd demo
python -m http.server 8000

# Then open: http://localhost:8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run server
cd demo
http-server

# Then open: http://localhost:8080
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

## File Structure

```
demo/
├── index.html          # Main HTML structure
├── styles.css          # IBM Design System styling
├── script.js           # Interactive functionality and charts
└── README.md           # This file
```

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - IBM Design System colors and components
- **JavaScript (ES6+)** - Interactive features
- **Chart.js** - Data visualizations (loaded via CDN)

## IBM Design System

This demo follows IBM's design principles:

- **Colors**: IBM Blue (#0F62FE), grays, success green, warning yellow, error red
- **Typography**: IBM Plex Sans font family
- **Components**: Cards, tables, buttons, badges following IBM patterns
- **Spacing**: Consistent 8px grid system
- **Accessibility**: High contrast, keyboard navigation support

## Sample Data

The demo includes realistic sample data representing:
- 282 total roles across 5 business groups
- 87% overall succession coverage
- 34 high flyers identified for multiple roles
- 12 at-risk roles requiring attention
- Various succession candidates across different readiness timelines

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --ibm-blue: #0F62FE;
    --success-green: #24A148;
    --warning-yellow: #F1C21B;
    --error-red: #DA1E28;
}
```

### Adding More Data

Edit the chart data in `script.js`:

```javascript
data: {
    labels: ['Your', 'Labels', 'Here'],
    datasets: [{
        data: [10, 20, 30]
    }]
}
```

### Modifying Views

Edit the HTML structure in `index.html` within the view divs:

```html
<div id="your-view" class="view">
    <!-- Your content here -->
</div>
```

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Next Steps

This demo is designed to showcase the art of the possible. For production implementation:

1. **Backend Integration** - Connect to real data sources (SuccessFactors)
2. **Authentication** - Add IBM SSO/OAuth
3. **Real-time Data** - Implement live data refresh
4. **Advanced Features** - Add export, alerts, notifications
5. **Performance** - Optimize for large datasets
6. **Testing** - Add comprehensive test coverage

See the main project documentation in the `requirements/` folder for detailed implementation plans.

## Feedback

When sharing this demo with stakeholders, gather feedback on:

- ✅ Overall design and layout
- ✅ Usefulness of each dashboard view
- ✅ Missing features or metrics
- ✅ Navigation and user experience
- ✅ Data visualizations and charts
- ✅ Priority of features for production

## Support

For questions or issues with the demo:
1. Check the main project README
2. Review the requirements documentation
3. Contact the development team

---

**Demo Version**: 1.0  
**Last Updated**: 2026-05-28  
**Status**: Ready for stakeholder review