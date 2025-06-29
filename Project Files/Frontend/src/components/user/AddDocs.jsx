import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddDocs = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm(); // Ant Design form instance

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      message.error('Please select a PDF file.');
      return;
    }

    if (selectedFile.type !== 'application/pdf') {
      message.error('Only PDF files are allowed.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      message.error('PDF file is required before upload.');
      return; // Stop submission
    }

    const user = JSON.parse(localStorage.getItem('userData'));
    if (!user || !user._id) {
      message.error("User not found.");
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    formData.append('userId', user._id);

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:8001/api/doctors/uploaddocument', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        message.success('Document uploaded successfully.');
        setFile(null);
        document.getElementById('pdfInput').value = ''; // Reset input field
        form.resetFields(); // Reset form
      } else {
        message.error(res.data.message || 'Upload failed.');
      }
    } catch (error) {
      console.error(error);
      message.error('Upload error occurred.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: '40px auto',
      padding: '24px',
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
        Upload Medical Document (PDF Only)
      </h2>

      <Form form={form} layout="vertical" onFinish={handleUpload}>
        <Form.Item
          label="Choose PDF File"
          name="pdf"
          rules={[{ required: true, message: 'PDF file is required.' }]}
        >
          <input
            id="pdfInput"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            htmlType="submit"
            block
            loading={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload PDF'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDocs;
