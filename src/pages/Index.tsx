
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import PDFUploader from '@/components/PDFUploader/PDFUploader';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import PDFPreview from '@/components/PDFPreview/PDFPreview';
import Summary from '@/components/Summary/Summary';
import { ArrowLeft } from 'lucide-react';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleCloseFile = () => {
    setUploadedFile(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            {uploadedFile ? (
              <button 
                onClick={handleCloseFile} 
                className="flex items-center gap-2 glass-button"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
            ) : (
              <div>
                <h1 className="text-3xl font-bold">PDF Summarizer</h1>
                <p className="text-gray-400">Upload a PDF to get an AI-powered summary</p>
              </div>
            )}
          </div>

          {!uploadedFile ? (
            <>
              <PDFUploader onFileUpload={handleFileUpload} />
              <HowItWorks />
            </>
          ) : (
            <>
              <PDFPreview file={uploadedFile} onClose={handleCloseFile} />
              <Summary file={uploadedFile} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
