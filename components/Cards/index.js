// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.
function Card(data) {
    
    const card = document.createElement('div')
    const headline = document.createElement('div')
    const authorContainer = document.createElement('div')
    const imageContainer = document.createElement('div')
    const image = document.createElement('img')
    const author = document.createElement('span')

    headline.textContent = data.headline
    image.src = data.authorPhoto
    author.textContent = `By ${data.authorName}`
    
    card.classList.add('card')
    headline.classList.add('headline')
    authorContainer.classList.add('author')
    imageContainer.classList.add('img-container')

    imageContainer.append(image)
    authorContainer.append(imageContainer, author)
    card.append(headline, authorContainer)

    return card
}

axios
    .get('https://lambda-times-backend.herokuapp.com/articles')
    .then(res => {
        const cardsContainer = document.querySelector('.cards-container')

        Object.keys(res.data.articles).forEach((key, index) => {
            res.data.articles[key].forEach(article => {
                cardsContainer.appendChild(Card(article))
            })
        })
    })
    .catch(error => {
        console.log('Error!!', error)
    })