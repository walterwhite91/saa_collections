import os
from pdf_builder import generate_review_pdf
from saa_config import SAA_COLORS, DESKTOP_ITEMS, MOBILE_ITEMS

def main():
    # Target folders and output configurations
    desktop_folder = "../UI_Screenshots/Desktop"
    mobile_folder = "../UI_Screenshots/Mobile"
    output_folder = "../artifacts"
    
    # 1. Generate Desktop Portfolio (Landscape, 78% Width Ratio)
    generate_review_pdf(
        orientation="L",
        title="SAA Collection - Desktop Review",
        subtitle="Desktop UI Design Review Portfolio",
        items=DESKTOP_ITEMS,
        folder=desktop_folder,
        output_name=os.path.join(output_folder, "saa_desktop_ui_review.pdf"),
        brand_colors=SAA_COLORS,
        width_ratio=0.78
    )
    
    # 2. Generate Mobile Portfolio (Portrait, 55% Width Ratio)
    generate_review_pdf(
        orientation="P",
        title="SAA Collection - Mobile Review",
        subtitle="Mobile UI Design Review Portfolio",
        items=MOBILE_ITEMS,
        folder=mobile_folder,
        output_name=os.path.join(output_folder, "saa_mobile_ui_review.pdf"),
        brand_colors=SAA_COLORS,
        width_ratio=0.55
    )
    
    print("PDF compilation completed successfully!")

if __name__ == "__main__":
    main()
