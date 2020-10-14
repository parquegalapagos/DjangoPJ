# encoding: utf-8
from __future__ import unicode_literals

from io import BytesIO
from django.http import HttpResponse

from django.template.loader import get_template
from django.template import Context, Template

from xhtml2pdf import pisa

def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html  = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None


def extract_request_variables(request):

    page_size = request.POST.get('page_size', 'letter')
    page_orientation = request.POST.get('page_orientation', 'portrait')

    pagesize = "%s %s" % (
        page_size, page_orientation
    )

    template = Template(request.POST.get('data', ''))
    data = template.render(Context({}))
    return {
        'pagesize': pagesize,
        'data': data,
        'page_orientation': page_orientation,
        'page_size': page_size,
        'example_number': request.POST.get("example_number", '1'),
        'border': request.POST.get('border', '')
    }