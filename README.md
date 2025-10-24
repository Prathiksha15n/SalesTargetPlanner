# Sales Target Planner – Chunking Method

A professional web application built with React.js for sales target planning using the Chunking Method. This tool helps sales teams and managers break down revenue goals into actionable targets for different products.

## Features

### Core Functionality
- **Revenue Goal Input**: Set your total revenue target
- **Product Configuration**: Configure multiple products with:
  - Product Value (% of Revenue Goal)
  - Sales Ratio (Historical %)
  - Product Price
  - Sales Conversion Ratio (%)

### Calculations (Chunking Method)
- **Revenue Goal per Product**: `RG_product = RG × (ProductValue / 100)`
- **Units to Sell**: `Units = RG_product / Product Price`
- **Target in Units**: Units with 10% buffer for safety
- **Leads Required**: `Leads = Units / (SCR / 100)`
- **Double Leads**: Conservative lead target (Leads × 2)

### Professional Features
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **Input Validation**: Real-time validation for all fields
- ✅ **Tooltips**: Helpful explanations for each field
- ✅ **Export Functionality**: Download results as CSV or PDF
- ✅ **Data Visualization**: Interactive charts for leads vs units
- ✅ **Professional UI**: Clean, business-oriented design

## Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Step 1: Set Revenue Goal
Enter your total revenue target for the planning period.

### Step 2: Configure Products
For each product, provide:
- **Product Value**: What percentage of total revenue this product should contribute
- **Sales Ratio**: Historical sales performance percentage
- **Product Price**: Unit price of the product
- **Sales Conversion Ratio**: Percentage of leads that convert to sales

### Step 3: Calculate Results
Click "Calculate Sales Targets" to see:
- Revenue goal allocation per product
- Units needed to sell
- Target units (with 10% buffer)
- Leads required based on conversion rates
- Conservative lead targets (double leads)

### Step 4: Export & Visualize
- Export results to CSV or PDF
- View interactive charts showing units vs leads
- Use the data for sales planning and team targets

## Technology Stack

- **React.js** with functional components and hooks
- **Styled Components** for professional styling
- **React Icons** for UI elements
- **Recharts** for data visualization
- **jsPDF** for PDF export
- **html2canvas** for chart rendering

## Project Structure

```
src/
├── components/
│   ├── Header.js          # App header with title
│   ├── InputPanel.js      # Input form container
│   ├── ProductForm.js     # Individual product configuration
│   ├── ResultsPanel.js    # Results display table
│   ├── ExportPanel.js     # CSV/PDF export functionality
│   ├── ChartPanel.js      # Data visualization charts
│   └── Tooltip.js         # Helpful tooltips component
├── App.js                 # Main application component
└── index.js              # Application entry point
```

## Business Use Cases

- **Sales Managers**: Plan team targets and quotas
- **Sales Teams**: Understand individual product goals
- **Business Planning**: Allocate resources across products
- **Performance Tracking**: Set measurable targets
- **Lead Generation**: Plan lead acquisition strategies

## Key Benefits

1. **Strategic Planning**: Break down high-level revenue goals into actionable targets
2. **Product Focus**: Allocate resources based on product performance and potential
3. **Lead Planning**: Calculate required leads for each product
4. **Risk Management**: Include safety buffers in targets
5. **Data-Driven**: Make decisions based on historical performance and conversion rates

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

---

**Built with ❤️ for professional sales teams**
