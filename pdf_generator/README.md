# Reusable Design Review PDF Generator

This utility is a standalone, reusable PDF compiler. It generates design portfolios and presentation decks from screenshots, website mockups, or application flows.

It supports **dynamic vertical image slicing** to ensure long scrolling screenshots (e.g. mobile homepages or long blog articles) are beautifully distributed across multiple PDF pages without cropping or compression.

## Folder Structure
```text
pdf_generator/
├── pdf_builder.py    # Core layout engine (reusable)
├── generate.py       # Executable entry point
├── saa_config.py     # SAA Collection data configuration
├── requirements.txt  # Dependencies
└── README.md         # This documentation
```

## Installation
Ensure you have Python 3 and pip installed. Navigate to the `pdf_generator` directory and run:
```bash
pip install -r requirements.txt
```

## How to Reuse for Other Projects

To adapt this compiler for a different project:

1. **Copy the Folder**:
   Copy the `pdf_generator` folder into your new project's codebase.

2. **Configure Colors and Items**:
   Create a new config file (like `saa_config.py`) containing your custom colors and image list:
   ```python
   YOUR_COLORS = {
       "primary": (RGB_RED, RGB_GREEN, RGB_BLUE),
       "secondary": (RGB_RED, RGB_GREEN, RGB_BLUE),
       "bg": (RGB_RED, RGB_GREEN, RGB_BLUE),
       "text": (RGB_RED, RGB_GREEN, RGB_BLUE),
       "muted": (RGB_RED, RGB_GREEN, RGB_BLUE)
   }

   YOUR_ITEMS = [
       {
           "file": "filename.png",
           "title": "Title to show on page header",
           "desc": "Detailed description text to render below the title."
       }
   ]
   ```

3. **Update generate.py**:
   Import your config variables and run the builder:
   ```python
   from pdf_builder import generate_review_pdf
   from your_config import YOUR_COLORS, YOUR_ITEMS

   generate_review_pdf(
       orientation="P", # "P" for Portrait, "L" for Landscape
       title="Your Title",
       subtitle="Your Subtitle",
       items=YOUR_ITEMS,
       folder="path/to/screenshots",
       output_name="output_review.pdf",
       brand_colors=YOUR_COLORS,
       width_ratio=0.75 # Fraction of page width the image should span (e.g. 0.75 = 75%)
   )
   ```

4. **Execute**:
   ```bash
   python3 generate.py
   ```
