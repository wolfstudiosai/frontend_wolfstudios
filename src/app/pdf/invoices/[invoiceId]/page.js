'use client';

import * as React from 'react';

import { PDFViewer } from '/src/components/core/pdf-viewer';
import { InvoicePDFDocument } from '/src/components/dashboard/invoice/invoice-pdf-document';

export default function Page() {
  return (
    <PDFViewer style={{ border: 'none', height: '100vh', width: '100vw' }}>
      <InvoicePDFDocument invoice={undefined} />
    </PDFViewer>
  );
}
