const handleInput = (event, setInput) => {
  const { name, value } = event.target
  setInput((prev) => {
    return {
      ...prev,
      [name]: value,
    }
  })
}

export default handleInput
