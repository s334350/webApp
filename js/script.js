const isValidatedX = () => {
  const xEL = document.querySelector('#X-value')
  const xVal = xEL.value.trim()
  const error = document.querySelector('.potentionalXError')
  const reX = Number(xVal)

  if (xVal == '') {
		error.innerHTML = 'Пустым x быть не должен!'
		return false
	} else if (isNaN(xVal)) {
		error.innerHTML = 'x - должен быть числом!'
		return false
	} else if (xVal > 3 || xVal < -3) {
		error.innerHTML = 'x &#8713; (-3; 3)?'
		return false
	} else if (!Number.isInteger(reX)) {
		error.innerHTML = 'Только целые числа!'
		return false
	} else {
		error.innerHTML = ''
		return true
	}

}

const isValidatedY = () => {
  const yEl = document.getElementById('Y-value')
  const yVal = yEl.value.trim()
  const error = document.querySelector('.potentionalYError')
  const reY = Number(yVal)

  if (yVal == '') {
    error.innerHTML = 'Пустым y быть не должен!'
    return false

  } else if (isNaN(yVal)) {
    error.innerHTML = 'y - должен быть числом!'
    return false

  } else if (yVal > 3 || yVal < -5) {
    error.innerHTML = 'y &#8713; (-5; 3)?'
    return false

  } else if(!Number.isInteger(reY)){
    error.innerHTML = 'Только целые числа!'
    return false

  } else {
    error.innerHTML = ''
    return true
  }
  
}

const isValidatedR = () => {
  const nodeList = document.getElementsByName('R')
  const error = document.getElementById('rError')

  const isSelectedR = Array.from(nodeList).some(radio => radio.checked)

  const numberArray = Array.from(nodeList)
    .map(num => Number(num.value))
    .filter(value => !isNaN(value))

  const array = [1, 1.5, 2, 2.5, 3]

  const set1 = new Set(numberArray)
  const set2 = new Set(array)

  const setAreEqual = set1.size === set2.size && [...set1].every(value => set2.has(value))

  if (!isSelectedR) {
    error.innerHTML = 'Не выбрана кнопка!'
    return false

  } else if (!setAreEqual) {
    error.innerHTML = 'Не меняйте значения!'
    return false

  }

}

const isCorrectValidation = () => {
  const correctRValidity = isValidatedR()
  const correctXValidity = isValidatedX()
  const correctYValidity = isValidatedY()

  if (correctXValidity && correctYValidity && correctRValidity) {
    return !!1

  } 
  return !!0

}

sendForm = () => {
  const form = document.getElementById('accessForm')

  form.addEventListener('submit', function(event){
    event.preventDefault()

    if(isCorrectValidation()){

      const x = getElementById('X-value').value
			const y = getElementById('Y-value').value
			const r = document.querySelector('input[name="R"]:checked').value

      const data = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&r=${encodeURIComponent(r)}`

			fetch('/fcgi-bin/server.jar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .then(result => {
        const resultBody = document.getElementById('resultBody');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${x}</td>
            <td>${y}</td>
            <td>${r}</td>
            <td>${result.result !== undefined ? (result.result ? 'true' : 'false') : 'undefined'}</td>
            <td>${result.currentTime !== undefined ? result.currentTime : 'undefined'}</td>
            <td>${result.executionTime !== undefined ? result.executionTime : 'undefined'}</td>
        `
        resultBody.appendChild(newRow)

        
        points.push({ x: parseFloat(x), y: parseFloat(y), r: parseFloat(r), result: result.result })
        localStorage.setItem('points', JSON.stringify(points));
      })
      .catch(error => console.error('Error:', error))}
    

  })   
    
}

isCorrectValidation()
sendForm()