async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇



  const cards = document.querySelector('.cards')
  const info = document.querySelector('.info')

  let url = `http://localhost:3003`

  const learners = await axios.get(`${url}/api/learners`)
  const mentors = await axios.get(`${url}/api/mentors`)


  let { data } = learners
  let combinedData = data.map((obj) => {
    let { data } = mentors
    obj.mentors.forEach((mentorId, idx) => {
      let mentor = data.find(item => item.id === mentorId);
      obj.mentors[idx] = `${mentor.firstName} ${mentor.lastName}`
    })
    return obj
  })


  combinedData.map((obj) => {

    let card = document.createElement('div')
    card.classList.add('card')

    let person = document.createElement('h3')
    person.innerText = obj.fullName

    let personEmail = document.createElement('div')
    personEmail.innerText = obj.email

    let mentors = document.createElement('h4')
    mentors.classList.add('closed')
    mentors.innerText = 'Mentors'

    let mentorList = document.createElement('ul')

    obj.mentors.map((x) => {

      let li = document.createElement('li')
      li.innerText = x

      mentorList.append(li)

    })

    card.append(person, personEmail, mentors, mentorList)

    cards.append(card)
  })

  if (combinedData.length > 0) {
    info.innerText = 'No learner is selected'
  }

  const allCards = document.querySelectorAll('.card')

  // console.log(allCards)
allCards.forEach(card => {
  card.addEventListener('click', () => {
    removeFocus()
    card.classList.add('selected')
  })
  removeFocus = () => {
    allCards.forEach(card => {
      card.classList.remove('selected')
    })
  }
})

  //-- footer
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  //-- end footer


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
