import os
from fpdf import FPDF
from PIL import Image

# Reusable Design Review PDF Class
class DesignReviewPDF(FPDF):
    def __init__(self, orientation="P", title_text="Design Review", brand_colors=None):
        super().__init__(orientation=orientation, unit="mm", format="A4")
        self.title_text = title_text
        self.orientation = orientation
        
        # Color palette setup (RGB tuples)
        # Defaults to a clean dark slate + blue theme if not custom specified
        self.colors = brand_colors or {
            "primary": (43, 76, 63),    # Header & Titles
            "secondary": (140, 98, 57),  # Accents & Borders
            "bg": (250, 246, 240),       # Cover Page Background
            "text": (80, 80, 80),        # Descriptions
            "muted": (120, 120, 120)     # Footers & Continues
        }
        
        self.set_margins(15, 15, 15)
        self.set_auto_page_break(auto=True, margin=15)
        
    def header(self):
        if self.page_no() == 1:
            return # Skip header on cover
            
        self.set_font("helvetica", "B", 10)
        self.set_text_color(*self.colors["primary"])
        self.cell(0, 10, self.title_text.upper(), border=0, new_x="LMARGIN", new_y="NEXT", align="L")
        
        # Thin divider line
        self.set_draw_color(*self.colors["secondary"])
        self.set_line_width(0.3)
        self.line(self.get_x(), self.get_y(), self.w - 15, self.get_y())
        self.ln(5)

    def footer(self):
        if self.page_no() == 1:
            return # Skip footer on cover
            
        self.set_y(-15)
        self.set_font("helvetica", "I", 8)
        self.set_text_color(*self.colors["muted"])
        page_num = f"Page {self.page_no()}"
        self.cell(0, 10, page_num, border=0, align="C")

    def create_cover_page(self, main_title="DESIGN PORTFOLIO", subtitle="UI Review documentation"):
        self.add_page()
        # Draw background block
        self.set_fill_color(*self.colors["bg"])
        self.rect(0, 0, self.w, self.h, "F")
        
        # Decorative border
        self.set_draw_color(*self.colors["primary"])
        self.set_line_width(1)
        self.rect(10, 10, self.w - 20, self.h - 20)
        
        self.set_y(self.h / 3)
        self.set_font("helvetica", "B", 32)
        self.set_text_color(*self.colors["primary"])
        self.cell(0, 15, main_title.upper(), border=0, new_x="LMARGIN", new_y="NEXT", align="C")
        
        self.set_font("helvetica", "B", 16)
        self.set_text_color(*self.colors["secondary"])
        self.cell(0, 10, subtitle.upper(), border=0, new_x="LMARGIN", new_y="NEXT", align="C")
        
        self.ln(20)
        self.set_font("helvetica", "", 12)
        self.set_text_color(50, 50, 50)
        self.cell(0, 10, "Aesthetic & Technical Design Review Documentation", border=0, new_x="LMARGIN", new_y="NEXT", align="C")
        self.cell(0, 6, "Platform: " + ("Desktop View" if self.orientation == "L" else "Mobile View"), border=0, new_x="LMARGIN", new_y="NEXT", align="C")
        self.cell(0, 6, "Date: June 2026", border=0, new_x="LMARGIN", new_y="NEXT", align="C")

    def add_screenshot_page(self, title, image_path, description="", width_ratio=0.75):
        if not os.path.exists(image_path):
            self.add_page()
            self.set_font("helvetica", "I", 12)
            self.set_text_color(200, 0, 0)
            self.cell(0, 10, f"Error: Image not found at {image_path}", border=0, new_x="LMARGIN", new_y="NEXT")
            return

        with Image.open(image_path) as img:
            img_w, img_h = img.size

        # Width of image in PDF units (mm)
        target_w = self.w * width_ratio
        
        # Calculated height of image at target width
        calculated_h = target_w * (img_h / img_w)
        max_h_default = self.h - 55  # default height limit per page

        # If it fits completely on one page
        if calculated_h <= max_h_default:
            self.add_page()
            self.set_font("helvetica", "B", 16)
            self.set_text_color(*self.colors["primary"])
            self.cell(0, 10, title, border=0, new_x="LMARGIN", new_y="NEXT", align="L")
            if description:
                self.set_font("helvetica", "", 10)
                self.set_text_color(*self.colors["text"])
                self.multi_cell(0, 5, description)
                self.ln(5)
            
            x = (self.w - target_w) / 2
            y = self.get_y()
            self.image(image_path, x=x, y=y, w=target_w, h=calculated_h)
            return

        # Slicing flow for long screenshot files
        y_pointer = 0
        part_num = 1
        
        # Dry-run segment count
        total_parts = 0
        temp_pointer = 0
        while temp_pointer < img_h:
            total_parts += 1
            avail_h = (self.h - 55 - 15) if total_parts == 1 else (self.h - 30 - 15)
            avail_h_px = int(img_w * (avail_h / target_w))
            if avail_h_px <= 10:
                avail_h_px = img_h
            temp_pointer += avail_h_px

        while y_pointer < img_h:
            self.add_page()
            
            if part_num == 1:
                self.set_font("helvetica", "B", 16)
                self.set_text_color(*self.colors["primary"])
                self.cell(0, 10, title, border=0, new_x="LMARGIN", new_y="NEXT", align="L")
                if description:
                    self.set_font("helvetica", "", 10)
                    self.set_text_color(*self.colors["text"])
                    self.multi_cell(0, 5, description)
                    self.ln(5)
            else:
                self.set_font("helvetica", "B", 16)
                self.set_text_color(*self.colors["primary"])
                page_title = f"{title} (Part {part_num} of {total_parts})"
                self.cell(0, 10, page_title, border=0, new_x="LMARGIN", new_y="NEXT", align="L")
                self.set_font("helvetica", "I", 10)
                self.set_text_color(*self.colors["muted"])
                self.cell(0, 5, "Continued vertical scroll...", border=0, new_x="LMARGIN", new_y="NEXT")
                self.ln(5)

            y_curr = self.get_y()
            avail_h = self.h - y_curr - 15
            avail_h_px = int(img_w * (avail_h / target_w))
            
            y_start = y_pointer
            y_end = min(y_pointer + avail_h_px, img_h)
            
            if y_end - y_start <= 0:
                break
                
            with Image.open(image_path) as img_file:
                segment = img_file.crop((0, y_start, img_w, y_end))
                temp_segment_path = f"temp_segment_{part_num}.png"
                segment.save(temp_segment_path)
                
            display_h = target_w * ((y_end - y_start) / img_w)
            x = (self.w - target_w) / 2
            
            self.set_auto_page_break(False)
            self.image(temp_segment_path, x=x, y=y_curr, w=target_w, h=display_h)
            self.set_auto_page_break(True, margin=15)
            
            if os.path.exists(temp_segment_path):
                os.remove(temp_segment_path)
                
            y_pointer = y_end
            part_num += 1

def generate_review_pdf(orientation, title, subtitle, items, folder, output_name, brand_colors=None, width_ratio=0.75):
    pdf = DesignReviewPDF(orientation=orientation, title_text=title, brand_colors=brand_colors)
    pdf.create_cover_page(main_title=title, subtitle=subtitle)
    
    for item in items:
        image_path = os.path.join(folder, item["file"])
        pdf.add_screenshot_page(
            title=item["title"],
            image_path=image_path,
            description=item["desc"],
            width_ratio=width_ratio
        )
        
    os.makedirs(os.path.dirname(output_name), exist_ok=True)
    pdf.output(output_name)
