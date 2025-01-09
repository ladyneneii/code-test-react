import React, { useEffect, useState } from 'react'

const Button = ({onClick, isOpened}) => {
  const [content, setContent] = useState('')

  useEffect(() => {
    setContent(isOpened ? "hide" : "view")
  }, [isOpened])
  
  return (
    <div onClick={onClick} className='btn btn--primary'>{content}</div>
  )
}

export default Button