'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Type, 
  Image as ImageIcon, 
  User, 
  X, 
  RotateCcw,
  Wand2,
  ChevronRight
} from 'lucide-react';
import { ColorModal } from './ColorModal';
import { SockPreview } from './SockPreview';
import { ColorSwatch } from './ColorSwatch';

type TabType = 'colors' | 'text' | 'logo' | 'details';

interface SockDesign {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  stripeColor: string;
  borderColor: string;
  text: string;
  textLocation: string;
  textColor: string;
  logo: string | null;
  logoOption: 'upload' | 'email' | 'none';
  logoLocation: string;
  livePreview: boolean;
  sockType: string;
}

export function NewSockBuilder() {
  const [activeTab, setActiveTab] = useState<TabType>('colors');
  const [showColorModal, setShowColorModal] = useState(false);
  const [colorType, setColorType] = useState<'primary' | 'secondary' | 'accent' | 'stripe' | 'border' | 'text'>('primary');
  
  const [design, setDesign] = useState<SockDesign>({
    primaryColor: 'Light Grey',
    secondaryColor: 'Black',
    accentColor: 'Red',
    stripeColor: 'Red',
    borderColor: 'Black',
    text: 'LIONS',
    textLocation: 'Back (Vertical)',
    textColor: 'Red',
    logo: null,
    logoOption: 'upload',
    logoLocation: 'Front',
    livePreview: true, // Enable live preview by default
    sockType: 'ankle'
  });

  const [debugMode, setDebugMode] = useState(false);

  const tabs = [
    { id: 'colors' as TabType, label: 'Colors', icon: Palette },
    { id: 'text' as TabType, label: 'Text', icon: Type },
    { id: 'logo' as TabType, label: 'Logo', icon: ImageIcon },
    { id: 'details' as TabType, label: 'Details', icon: User },
  ];

  const handleColorChange = (color: string) => {
    if (colorType === 'primary') {
      setDesign(prev => ({ ...prev, primaryColor: color }));
    } else if (colorType === 'secondary') {
      setDesign(prev => ({ ...prev, secondaryColor: color }));
    } else if (colorType === 'accent') {
      setDesign(prev => ({ ...prev, accentColor: color }));
    } else if (colorType === 'stripe') {
      setDesign(prev => ({ ...prev, stripeColor: color }));
    } else if (colorType === 'border') {
      setDesign(prev => ({ ...prev, borderColor: color }));
    } else if (colorType === 'text') {
      setDesign(prev => ({ ...prev, textColor: color }));
    }
    setShowColorModal(false);
  };

  const handleTextChange = (text: string) => {
    setDesign(prev => ({ ...prev, text }));
  };

  const handleTextLocationChange = (location: string) => {
    setDesign(prev => ({ ...prev, textLocation: location }));
  };

  const handleLogoOptionChange = (option: 'upload' | 'email' | 'none') => {
    setDesign(prev => ({ ...prev, logoOption: option }));
  };

  const openColorModal = (type: 'primary' | 'secondary' | 'accent' | 'stripe' | 'border' | 'text') => {
    setColorType(type);
    setShowColorModal(true);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setDesign(prev => ({ ...prev, logo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setDesign(prev => ({ ...prev, logo: null }));
  };

  const getColorButton = (color: string, label: string, type: 'primary' | 'secondary' | 'text') => {
    return (
      <button
        onClick={() => openColorModal(type)}
        className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors w-full"
      >
        <ColorSwatch color={color} size="md" />
        <div className="text-left">
          <div className="font-medium">{color}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Pink Header */}
      <div className="bg-pink-500 text-white py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-pink-500 text-xs font-bold">S</span>
            </div>
            <span className="font-semibold">Grab your Pink Awareness Socks</span>
          </div>
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            View Designs
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Left Panel - Sock Preview */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <SockPreview design={design} debugMode={debugMode} />
        </div>

        {/* Right Panel - Customization */}
        <div className="w-96 bg-gray-50 border-l border-gray-200">
          <Card className="h-full rounded-none border-0 shadow-none">
            <div className="p-6">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-black border-b-2 border-black'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'colors' && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-green-500 text-white">1</Badge>
                      <h3 className="text-lg font-semibold">Colors</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Sock Type Selector */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Sock Type</label>
                        <select
                          value={design.sockType}
                          onChange={(e) => setDesign(prev => ({ ...prev, sockType: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="ankle">Ankle Sock</option>
                          <option value="crew">Crew Sock</option>
                          <option value="knee-high">Knee High</option>
                          <option value="over-the-knee">Over the Knee</option>
                          <option value="quarter">Quarter Sock</option>
                        </select>
                      </div>

                      {getColorButton(design.primaryColor, 'Body', 'primary')}
                      {getColorButton(design.secondaryColor, 'Toe / Heel', 'secondary')}
                      {getColorButton(design.accentColor, 'Accent Areas', 'accent')}
                      {getColorButton(design.stripeColor, 'Stripes', 'stripe')}
                      {getColorButton(design.borderColor, 'Borders', 'border')}
                      
                      {/* Debug Mode Toggle */}
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Show Color Areas</span>
                        <button
                          onClick={() => setDebugMode(!debugMode)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            debugMode ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              debugMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800">
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}

                {activeTab === 'text' && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-green-500 text-white">2</Badge>
                      <h3 className="text-lg font-semibold">Text</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Add Text (optional)
                        </label>
                        <div className="relative">
                          <Input
                            value={design.text}
                            onChange={(e) => handleTextChange(e.target.value)}
                            placeholder="Enter text..."
                            className="pr-10"
                          />
                          <button
                            onClick={() => handleTextChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Text Location
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={design.textLocation}
                            onChange={(e) => handleTextLocationChange(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Back (Vertical)">Back (Vertical)</option>
                            <option value="Back">Back</option>
                            <option value="Front">Front</option>
                            <option value="Front Below (Logo)">Front Below (Logo)</option>
                          </select>
                          <Button variant="outline" size="sm" className="px-3">
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Text Color
                        </label>
                        <button
                          onClick={() => openColorModal('text')}
                          className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors w-full"
                        >
                          <ColorSwatch color={design.textColor} size="md" />
                          <div className="text-left">
                            <div className="font-medium">{design.textColor}</div>
                            <div className="text-sm text-gray-500">Text Color</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800">
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}

                {activeTab === 'logo' && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-green-500 text-white">3</Badge>
                      <h3 className="text-lg font-semibold">Logo</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Logo Option Selection */}
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                          <input
                            type="radio"
                            name="logoOption"
                            value="upload"
                            checked={design.logoOption === 'upload'}
                            onChange={() => handleLogoOptionChange('upload')}
                            className="text-blue-600"
                          />
                          <span className="font-medium">Upload your logo now</span>
                        </label>
                        
                        <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                          <input
                            type="radio"
                            name="logoOption"
                            value="email"
                            checked={design.logoOption === 'email'}
                            onChange={() => handleLogoOptionChange('email')}
                            className="text-blue-600"
                          />
                          <span className="font-medium">Email your logo to us later</span>
                        </label>
                        
                        <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                          <input
                            type="radio"
                            name="logoOption"
                            value="none"
                            checked={design.logoOption === 'none'}
                            onChange={() => handleLogoOptionChange('none')}
                            className="text-blue-600"
                          />
                          <span className="font-medium">No logo needed</span>
                        </label>
                      </div>

                      {/* Logo Upload Section */}
                      {design.logoOption === 'upload' && (
                        <div className="space-y-4">
                          {/* Logo Location Selector */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Logo Location</label>
                            <div className="flex items-center gap-2">
                              <select
                                value={design.logoLocation}
                                onChange={(e) => setDesign(prev => ({ ...prev, logoLocation: e.target.value }))}
                                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="Front">Front</option>
                                <option value="Outside">Outside</option>
                                <option value="Sides">Sides</option>
                                <option value="Inside">Inside</option>
                              </select>
                              <button
                                onClick={() => setDesign(prev => ({ ...prev, logo: null }))}
                                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Upload Button */}
                          <div className="space-y-2">
                            <input
                              type="file"
                              id="logo-upload"
                              accept="image/*"
                              onChange={handleLogoUpload}
                              className="hidden"
                            />
                            <label
                              htmlFor="logo-upload"
                              className="flex items-center justify-center gap-2 w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                            >
                              <ImageIcon className="w-4 h-4" />
                              Upload Your Logo
                            </label>
                          </div>

                          {/* Logo Preview */}
                          {design.logo && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">Logo Preview</label>
                              <div className="p-4 border border-gray-300 rounded-lg bg-white">
                                <img
                                  src={design.logo}
                                  alt="Logo preview"
                                  className="max-w-full max-h-20 object-contain mx-auto"
                                />
                                <button
                                  onClick={handleRemoveLogo}
                                  className="mt-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                                >
                                  Remove Logo
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Design Team Note */}
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Wand2 className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm text-yellow-800">
                                Don't worry! Our design team will fix your logo where needed.
                              </span>
                            </div>
                          </div>

                          {/* Live Preview Toggle */}
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Live Preview</label>
                            <button
                              onClick={() => setDesign(prev => ({ ...prev, livePreview: !prev.livePreview }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                design.livePreview ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  design.livePreview ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800">
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-green-500 text-white">4</Badge>
                      <h3 className="text-lg font-semibold">Details</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Review your custom sock design and proceed to checkout.
                      </p>
                    </div>

                    <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800">
                      Complete Order
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Color Selection Modal */}
      {showColorModal && (
        <ColorModal
          isOpen={showColorModal}
          onClose={() => setShowColorModal(false)}
          onSelectColor={handleColorChange}
          currentColor={colorType === 'primary' ? design.primaryColor : colorType === 'secondary' ? design.secondaryColor : design.textColor}
        />
      )}
    </div>
  );
}
