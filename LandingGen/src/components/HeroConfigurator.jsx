'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Type, FileImage, Layout, Copy, Check, Palette, Box, TypeIcon as Typography, Wand2 } from 'lucide-react'
import { toast, Toaster } from 'sonner'

const heroTypes = [
  { id: 'centered', name: 'Centered Hero', description: 'Content centered with optional CTA buttons' },
  { id: 'split', name: 'Split Hero', description: 'Content on left, image/gradient on right' },
  { id: 'minimal', name: 'Minimal Hero', description: 'Clean, minimal design with subtle animations' }
]

const backgroundTypes = [
  { id: 'image', name: 'Image Background' },
  { id: 'gradient', name: 'Gradient Background' },
  { id: 'solid', name: 'Solid Color' }
]

const fontOptions = [
  'font-sans',
  'font-serif',
  'font-mono'
]

export default function HeroConfigurator() {
  // Basic content state
  const [heading, setHeading] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  
  // Advanced configuration state
  const [heroType, setHeroType] = useState('centered')
  const [backgroundType, setBackgroundType] = useState('image')
  const [gradientFrom, setGradientFrom] = useState('#3b82f6')
  const [gradientTo, setGradientTo] = useState('#06b6d4')
  const [solidColor, setSolidColor] = useState('#1e293b')
  const [selectedFont, setSelectedFont] = useState('font-sans')
  
  // Button configuration
  const [showButtons, setShowButtons] = useState(false)
  const [primaryButton, setPrimaryButton] = useState({ text: '', color: '#3b82f6' })
  const [secondaryButton, setSecondaryButton] = useState({ text: '', color: '#64748b' })

  // Code generation state
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateCode = () => {
    let backgroundStyle = ''
    if (backgroundType === 'image') {
      backgroundStyle = `backgroundImage: 'url(${url})'`
    } else if (backgroundType === 'gradient') {
      backgroundStyle = `background: 'linear-gradient(to right, ${gradientFrom}, ${gradientTo})'`
    } else {
      backgroundStyle = `backgroundColor: '${solidColor}'`
    }

    const code = `
import React from 'react'

export default function Hero() {
  return (
    ${heroType === 'split' ? `
    <div className="relative w-full h-screen flex ${selectedFont}">
      {/* Left Content Side */}
      <div className="w-1/2 flex flex-col items-start justify-center p-12 bg-gradient-to-r from-black to-transparent">
        <h1 className="text-4xl md:text-6xl font-bold text-white">${heading}</h1>
        <h2 className="text-xl md:text-2xl mt-4 text-white/80">${description}</h2>
        ${showButtons ? `
        <div className="flex gap-4 mt-8">
          ${primaryButton.text ? `
          <button 
            className="px-6 py-2 rounded-lg font-medium"
            style={{ backgroundColor: '${primaryButton.color}' }}
          >
            ${primaryButton.text}
          </button>` : ''}
          ${secondaryButton.text ? `
          <button 
            className="px-6 py-2 rounded-lg font-medium border-2"
            style={{ borderColor: '${secondaryButton.color}', color: '${secondaryButton.color}' }}
          >
            ${secondaryButton.text}
          </button>` : ''}
        </div>` : ''}
      </div>
      {/* Right Image/Gradient Side */}
      <div className="w-1/2">
        ${backgroundType === 'image' ? `
        <img 
          src="${url}" 
          alt="Hero background"
          className="w-full h-full object-cover"
        />` : backgroundType === 'gradient' ? `
        <div 
          className="w-full h-full"
          style={{ background: 'linear-gradient(to right, ${gradientFrom}, ${gradientTo})' }}
        />` : `
        <div 
          className="w-full h-full"
          style={{ backgroundColor: '${solidColor}' }}
        />`}
      </div>
    </div>` : `
    <div
      className="relative w-full h-screen ${selectedFont}"
      style={{ ${backgroundStyle} }}
    >
      <div className="absolute inset-0 ${backgroundType === 'image' ? 'bg-black/50' : ''} flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold">${heading}</h1>
        <h2 className="text-xl md:text-2xl mt-4">${description}</h2>
        ${showButtons ? `
        <div className="flex gap-4 mt-8">
          ${primaryButton.text ? `
          <button 
            className="px-6 py-2 rounded-lg font-medium"
            style={{ backgroundColor: '${primaryButton.color}' }}
          >
            ${primaryButton.text}
          </button>` : ''}
          ${secondaryButton.text ? `
          <button 
            className="px-6 py-2 rounded-lg font-medium border-2"
            style={{ borderColor: '${secondaryButton.color}', color: '${secondaryButton.color}' }}
          >
            ${secondaryButton.text}
          </button>` : ''}
        </div>` : ''}
      </div>
    </div>`}
  )
}`

    return code.trim()
  }

  const copyToClipboard = async () => {
    const code = generateCode()
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success('Code copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-black p-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmMTAiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl relative"
        >
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400 opacity-60" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400 opacity-60" />
          
          <div className="backdrop-blur-xl bg-black/40 border border-blue-900/50 shadow-2xl shadow-blue-500/20 rounded-xl">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-8 text-center">
                Hero Section Configurator
              </h2>
              
              <form className="space-y-8">
                {/* Hero Type Selection */}
                <div className="grid gap-6 md:grid-cols-3">
                  {heroTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      className={`group relative cursor-pointer ${
                        heroType === type.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setHeroType(type.id)}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                      <div className="relative p-4 rounded-lg bg-black/40">
                        <Box className="w-6 h-6 text-blue-400 mb-2" />
                        <h3 className="text-blue-200 font-medium">{type.name}</h3>
                        <p className="text-sm text-blue-200/70 mt-1">{type.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Basic Content */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                    <div className="relative space-y-2 bg-black/40 p-4 rounded-lg">
                      <label className="text-sm font-medium text-blue-200 flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Heading
                      </label>
                      <input
                        type="text"
                        placeholder="Enter heading"
                        className="w-full px-3 py-2 rounded-md bg-black/30 border border-blue-900/50 text-blue-100 placeholder:text-blue-500/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                    <div className="relative space-y-2 bg-black/40 p-4 rounded-lg">
                      <label className="text-sm font-medium text-blue-200 flex items-center gap-2">
                        <Layout className="w-4 h-4" />
                        Description
                      </label>
                      <input
                        type="text"
                        placeholder="Enter description"
                        className="w-full px-3 py-2 rounded-md bg-black/30 border border-blue-900/50 text-blue-100 placeholder:text-blue-500/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                    <div className="relative space-y-2 bg-black/40 p-4 rounded-lg">
                      <label className="text-sm font-medium text-blue-200 flex items-center gap-2">
                        <Typography className="w-4 h-4" />
                        Font Style
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-md bg-black/30 border border-blue-900/50 text-blue-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                        value={selectedFont}
                        onChange={(e) => setSelectedFont(e.target.value)}
                      >
                        {fontOptions.map((font) => (
                          <option key={font} value={font}>
                            {font.replace('font-', '').charAt(0).toUpperCase() + font.slice(6)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                </div>

                {/* Background Configuration */}
                <div className="grid gap-6 md:grid-cols-3">
                  {backgroundTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      className={`group relative cursor-pointer ${
                        backgroundType === type.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setBackgroundType(type.id)}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                      <div className="relative p-4 rounded-lg bg-black/40">
                        <Palette className="w-6 h-6 text-blue-400 mb-2" />
                        <h3 className="text-blue-200 font-medium">{type.name}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Background Type Specific Inputs */}
                <AnimatePresence mode="wait">
                  {backgroundType === 'image' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                      <div className="relative space-y-2 bg-black/40 p-4 rounded-lg">
                        <label className="text-sm font-medium text-blue-200 flex items-center gap-2">
                          <FileImage className="w-4 h-4" />
                          Background Image URL
                        </label>
                        <input
                          type="text"
                          placeholder="Enter image URL"
                          className="w-full px-3 py-2 rounded-md bg-black/30 border border-blue-900/50 text-blue-100 placeholder:text-blue-500/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}

                  {backgroundType === 'gradient' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                      <div className="relative space-y-2 bg-black/40 p-4 rounded-lg grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-blue-200">Gradient Start</label>
                          <input
                            type="color"
                            className="w-full h-10 rounded cursor-pointer mt-2"
                            value={gradientFrom}
                            onChange={(e) => setGradientFrom(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-blue-200">Gradient End</label>
                          <input
                            type="color"
                            className="w-full h-10 rounded cursor-pointer mt-2"
                            value={gradientTo}
                            onChange={(e) => setGradientTo(e.target.value)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {backgroundType === 'solid' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                      <div className="relative space-y-2 bg-black/40 p-4 rounded-lg">
                        <label className="text-sm font-medium text-blue-200">Background Color</label>
                        <input
                          type="color"
                          className="w-full h-10 rounded cursor-pointer"
                          value={solidColor}
                          onChange={(e) => setSolidColor(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Button Configuration */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                  <div className="relative space-y-4 bg-black/40 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-blue-200">Include Buttons</label>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          showButtons ? 'bg-blue-500 text-white' : 'bg-black/30 text-blue-200'
                        }`}
                        onClick={() => setShowButtons(!showButtons)}
                      >
                        {showButtons ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>

                    {showButtons && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-200">Primary Button</label>
                            <input
                              type="text"
                              placeholder="Button text"
                              className="w-full px-3 py-2 rounded-md bg-black/30 border border-blue-900/50 text-blue-100 placeholder:text-blue-500/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                              value={primaryButton.text}
                              onChange={(e) => setPrimaryButton({ ...primaryButton, text: e.target.value })}
                            />
                            <input
                              type="color"
                              className="w-full h-10 rounded cursor-pointer"
                              value={primaryButton.color}
                              onChange={(e) => setPrimaryButton({ ...primaryButton, color: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-200">Secondary Button</label>
                            <input
                              type="text"
                              placeholder="Button text"
                              className="w-full px-3 py-2 rounded-md bg-black/30 border border-blue-900/50 text-blue-100 placeholder:text-blue-500/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                              value={secondaryButton.text}
                              onChange={(e) => setSecondaryButton({ ...secondaryButton, text: e.target.value })}
                            />
                            <input
                              type="color"
                              className="w-full h-10 rounded cursor-pointer"
                              value={secondaryButton.color}
                              onChange={(e) => setSecondaryButton({ ...secondaryButton, color: e.target.value })}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Generate Code Button */}
                <motion.div
                  className="flex justify-center gap-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Wand2 className="w-4 h-4" />
                    {showCode ? 'Hide Code' : 'Generate Code'}
                  </button>
                  {showCode && (
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="px-6 py-3 rounded-lg bg-blue-500/20 text-blue-200 font-medium flex items-center gap-2 hover:bg-blue-500/30 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  )}
                </motion.div>

                {/* Code Preview */}
                <AnimatePresence>
                  {showCode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30" />
                      <pre className="relative p-4 rounded-lg bg-black/40 text-blue-200 overflow-x-auto">
                        <code>{generateCode()}</code>
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live Preview */}
      <div className={selectedFont}>
        {heroType === 'split' ? (
          <div className="relative w-full h-screen flex">
            {/* Left Content Side */}
            <div className="w-1/2 flex flex-col items-start justify-center p-12 bg-gradient-to-r from-black to-transparent">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-6xl font-bold text-white"
              >
                {heading || 'Enter Your Heading'}
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl mt-4 text-white/80"
              >
                {description || 'Enter Your Description'}
              </motion.h2>
              
              {showButtons && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4 mt-8"
                >
                  {primaryButton.text && (
                    <button 
                      className="px-6 py-2 rounded-lg font-medium"
                      style={{ backgroundColor: primaryButton.color }}
                    >
                      {primaryButton.text}
                    </button>
                  )}
                  {secondaryButton.text && (
                    <button 
                      className="px-6 py-2 rounded-lg font-medium border-2"
                      style={{ borderColor: secondaryButton.color, color: secondaryButton.color }}
                    >
                      {secondaryButton.text}
                    </button>
                  )}
                </motion.div>
              )}
            </div>
            {/* Right Image/Gradient Side */}
            <div className="w-1/2">
              {backgroundType === 'image' ? (
                <img 
                  src={url} 
                  alt="Hero background"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder.svg?height=1080&width=1920'
                  }}
                />
              ) : backgroundType === 'gradient' ? (
                <div 
                  className="w-full h-full"
                  style={{ background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}
                />
              ) : (
                <div 
                  className="w-full h-full"
                  style={{ backgroundColor: solidColor }}
                />
              )}
            </div>
          </div>
        ) : (
          <div
            className="relative w-full h-screen bg-cover bg-center"
            style={{
              ...(backgroundType === 'image' 
                ? { backgroundImage: `url(${url})` }
                : backgroundType === 'gradient'
                ? { background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }
                : { backgroundColor: solidColor }
              )
            }}
          >
            <div className={`absolute inset-0 ${backgroundType === 'image' ? 'bg-black/50' : ''} flex flex-col items-center justify-center text-white`}>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold"
              >
                {heading || 'Enter Your Heading'}
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl mt-4"
              >
                {description || 'Enter Your Description'}
              </motion.h2>
              
              {showButtons && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4 mt-8"
                >
                  {primaryButton.text && (
                    <button 
                      className="px-6 py-2 rounded-lg font-medium"
                      style={{ backgroundColor: primaryButton.color }}
                    >
                      {primaryButton.text}
                    </button>
                  )}
                  {secondaryButton.text && (
                    <button 
                      className="px-6 py-2 rounded-lg font-medium border-2"
                      style={{ borderColor: secondaryButton.color, color: secondaryButton.color }}
                    >
                      {secondaryButton.text}
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

