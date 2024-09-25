import React, { useState } from 'react'

export default function App() {

  const [radius, setRadius] = useState('');
  const [circle, setCircle] = useState([]);

  function distance(point1, point2) {
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  const handleClick = (e) => {
    const newCircle = { x: e.clientX, y: e.clientY };

    if (!radius) {
      return;
    }

    // Check for overlaps
    const isOverlapping = circle.some((circle) => {
      const gap = distance(circle, newCircle);
      return gap < 2 * radius;
    });

    if (!isOverlapping) {
      setCircle([...circle, newCircle]);
    }
  };
  // const handleClick = (e) => {
  //   setX(e.clientX);
  //   setY(e.clientY);
  //   if (!radius) {
  //     setCircle([]);
  //   } else {
  //     setCircle([...circle, { x: e.clientX, y: e.clientY }]);
  //     console.log(circle);
  //   }
  // }

  const handleDelete = (index) => {
    const updatedCircle = circle.filter((_, i) => i !== index);
    setCircle(updatedCircle);
  }

  const handleSubmit = (e) => {
    // setRadius(e.target.value);
    console.log(radius)
  }
  const handleRadius = (e) => setRadius(e.target.value)

  return (
    <div>
      <div className='h-screen relative'>
        <div className='flex justify-center'>
          <div className='flex my-4'>
            <p>Enter the Radius</p>
            <input type="number"
              onChange={handleRadius}
              value={radius}
              className='border mx-2 appearance-none outline-none'
              placeholder='Enter Radius' />
            <button className='bg-gray-500 text-white p-1' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <div className='h-[90%] bg-gray-300' onClick={handleClick}>
          {circle.map((dot, index) => (
            <div
              key={index}
              className='absolute border bg-blue-500 rounded-full'
              onClick={(e) => { e.stopPropagation(); handleDelete(index) }}
              style={{
                height: `${2 * radius}px`,
                width: `${2 * radius}px`,
                top: `${dot.y - radius}px`,
                left: `${dot.x - radius}px`,
              }}>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}