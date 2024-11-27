import React, { useState } from 'react'

const Navbar = () => {
  const [listItems, setListItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [formData, setFormData] = useState({
    logo: '',
    authOption: 'login',
    backgroundType: 'static',
    backgroundColor: '#ffffff',
    gradientStart: '#ffffff',
    gradientEnd: '#000000',
    gradientDirection: 'to right',
  })
  const [generatedCode, setGeneratedCode] = useState('')

  const addListItem = () => {
    if (newItemName.trim()) {
      setListItems([...listItems, { id: listItems.length + 1, name: newItemName.trim() }])
      setNewItemName('')
    }
  }

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const getBackgroundStyle = () => {
    if (formData.backgroundType === 'static') {
      return { backgroundColor: formData.backgroundColor }
    } else {
      return { 
        backgroundImage: `linear-gradient(${formData.gradientDirection}, ${formData.gradientStart}, ${formData.gradientEnd})` 
      }
    }
  }

  const generateCode = () => {
    const code = `
import React from 'react'

const Navbar = () => {
  return (
    <nav 
      className="flex items-center justify-between p-4 rounded-lg shadow-md"
      style={{
        ${formData.backgroundType === 'static' 
          ? `backgroundColor: '${formData.backgroundColor}'` 
          : `backgroundImage: 'linear-gradient(${formData.gradientDirection}, ${formData.gradientStart}, ${formData.gradientEnd})'`
        }
      }}
    >
      <div className="flex items-center">
        ${formData.logo ? `<img src="${formData.logo}" alt="Company Logo" className="h-8 w-auto" />` : ''}
      </div>
      <ul className="flex space-x-4">
        ${listItems.map(item => `<li key={${item.id}} className="text-sm font-medium">${item.name}</li>`).join('\n        ')}
      </ul>
      <div>
        <button className="px-4 py-2 text-sm font-medium bg-white text-gray-800 rounded-md shadow-sm hover:bg-gray-100">
          ${formData.authOption === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
    `
    setGeneratedCode(code)
  }

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <nav 
        className="flex items-center justify-between p-4 rounded-lg shadow-md"
        style={getBackgroundStyle()}
      >
        <div className="flex items-center">
          {formData.logo && <img src={formData.logo} alt="Company Logo" className="h-8 w-auto" />}
        </div>
        <ul className="flex space-x-4">
          {listItems.map((item) => (
            <li key={item.id} className="text-sm font-medium">
              {item.name}
            </li>
          ))}
        </ul>
        <div>
          <button className="px-4 py-2 text-sm font-medium bg-white text-gray-800 rounded-md shadow-sm hover:bg-gray-100">
            {formData.authOption === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </nav>

      <form className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Company Logo URL</label>
            <input 
              type="text"
              id="logo" 
              value={formData.logo} 
              onChange={(e) => updateFormData('logo', e.target.value)} 
              placeholder="Enter logo URL"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-6"
            />
          </div>

          <div>
            <label htmlFor="newItem" className="block text-sm font-medium text-gray-700">Add List Item</label>
            <div className="flex mt-1">
              <input 
                type="text"
                id="newItem" 
                value={newItemName} 
                onChange={(e) => setNewItemName(e.target.value)} 
                placeholder="Enter item name"
                className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-6"
              />
              <button 
                type="button" 
                onClick={addListItem} 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-gray-700">Auth Option</span>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="authOption"
                  value="login"
                  checked={formData.authOption === 'login'}
                  onChange={(e) => updateFormData('authOption', e.target.value)}
                />
                <span className="ml-2">Login</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="authOption"
                  value="signup"
                  checked={formData.authOption === 'signup'}
                  onChange={(e) => updateFormData('authOption', e.target.value)}
                />
                <span className="ml-2">Sign Up</span>
              </label>
            </div>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-700">Background Type</span>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="backgroundType"
                  value="static"
                  checked={formData.backgroundType === 'static'}
                  onChange={(e) => updateFormData('backgroundType', e.target.value)}
                />
                <span className="ml-2">Static Color</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="backgroundType"
                  value="gradient"
                  checked={formData.backgroundType === 'gradient'}
                  onChange={(e) => updateFormData('backgroundType', e.target.value)}
                />
                <span className="ml-2">Gradient</span>
              </label>
            </div>
          </div>
        </div>

        {formData.backgroundType === 'static' ? (
          <div>
            <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700">Background Color</label>
            <div className="flex items-center mt-1">
              <input 
                type="color" 
                id="backgroundColor" 
                value={formData.backgroundColor} 
                onChange={(e) => updateFormData('backgroundColor', e.target.value)} 
                className="w-10 h-10 rounded-full overflow-hidden"
              />
              <span className="ml-2 text-sm">{formData.backgroundColor}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="gradientStart" className="block text-sm font-medium text-gray-700">Start Color</label>
              <div className="flex items-center mt-1">
                <input 
                  type="color" 
                  id="gradientStart" 
                  value={formData.gradientStart} 
                  onChange={(e) => updateFormData('gradientStart', e.target.value)} 
                  className="w-10 h-10 rounded-full overflow-hidden"
                />
                <span className="ml-2 text-sm">{formData.gradientStart}</span>
              </div>
            </div>
            <div>
              <label htmlFor="gradientEnd" className="block text-sm font-medium text-gray-700">End Color</label>
              <div className="flex items-center mt-1">
                <input 
                  type="color" 
                  id="gradientEnd" 
                  value={formData.gradientEnd} 
                  onChange={(e) => updateFormData('gradientEnd', e.target.value)} 
                  className="w-10 h-10 rounded-full overflow-hidden"
                />
                <span className="ml-2 text-sm">{formData.gradientEnd}</span>
              </div>
            </div>
            <div>
              <label htmlFor="gradientDirection" className="block text-sm font-medium text-gray-700">Direction</label>
              <select 
                id="gradientDirection"
                value={formData.gradientDirection} 
                onChange={(e) => updateFormData('gradientDirection', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="to right">To Right</option>
                <option value="to left">To Left</option>
                <option value="to bottom">To Bottom</option>
                <option value="to top">To Top</option>
              </select>
            </div>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={generateCode}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Code
          </button>
        </div>
      </form>

      {generatedCode && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
          <pre className="text-white overflow-x-auto">
            <code>{generatedCode}</code>
          </pre>
        </div>
      )}
    </div>
  )
}

export default Navbar

