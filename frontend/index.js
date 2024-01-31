async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  //-- footer
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  //-- end footer


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
    person.innerHTML = obj.fullName

    let personEmail = document.createElement('div')
    personEmail.innerHTML = obj.email

    let mentors = document.createElement('h4')
    mentors.classList.add('closed')
    mentors.innerHTML = 'Mentors'



    let mentorList = document.createElement('ul')

    obj.mentors.map((x) => {

      let li = document.createElement('li')
      li.innerHTML = x

      mentorList.append(li)

    })

    card.append(person, personEmail, mentors, mentorList)

    cards.append(card)
  })


  if (combinedData.length > 0) {
    info.innerHTML = 'No learner is selected'
  }




  const allCards = document.querySelectorAll('.card')

  console.log(allCards)

  allCards.forEach((item, idx) => {

    item.addEventListener('click', function (e) {

      removeFocus(idx)
      if (['open', 'closed'].indexOf(e.target.className) > -1) {

        let h4 = item.querySelector('h4')
        h4.classList.toggle('open')
        h4.classList.toggle('closed')

        item.classList.add('selected')
      }
      else {
        item.classList.toggle('selected')
      }


      let h3 = item.querySelector('h3')
      h3.innerHTML = item.className.includes('selected') ? `${combinedData[idx].fullName}, id ${combinedData[idx].id}` : `${combinedData[idx].fullName}`
      info.innerHTML = item.className.includes('selected') ? `The selected learner is ${combinedData[idx].fullName}` : `No learner is selected`

      function removeFocus(i) {

        allCards.forEach((item, index) => {
          if (i != index) {
            item.classList.remove('selected')
          }

        })


      }

    })



  })


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
