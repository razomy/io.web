from fastapi import Request
from razomy.function.server.template_module import templates



def route_image(request: Request):
    return templates.TemplateResponse("image/index.html", {"request": request})
