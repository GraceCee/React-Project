import React from 'react'
import { useState , useEffect} from 'react';
import SingleCard from './SingleCard';

const cardImages = [
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]

const Hero = (props) => {


  //CREATE A STATE TO STORE OUR CARDS
  const [cards, setCards] = useState([]);

  //TO COUNT THE NUMBER OF TURNS OR FLIP WITH INITIAL NUMBER OF 0
  const [turns, setTurns] = useState(0);

  //TO COMPARE THE CHOICES
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  //TO MAKE THE CARD DISABLED WHEN THE CARD IS SELECTED FOR A PERIOD OF TIME AFTER MAKING CHOICES
  const [disabled, setDisabled] = useState(false);  

  //TO SHUFFLE THE CARDS AND TO DUPLICATE THE CARD IMAGES
  const shuffleCards = () => {

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random()-0.5) //IF THE RETURN NUMBER IS < 0, THE ORDER OF THOSE 2 ITEMS STAYS THE SAME. ELSE, SWAPPED
      .map((card)=>({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //HANDLE A CHOICE
  const handleChoice = (card) => {
    
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }


  //COMPARE TWO SELECTED CARDS; USEEFFECT IS GOIN TO FIRE WHEN THE COMPONENT IS FIRST MOUNT ONCE AUTOMATICALLY
  //AND IT'S GOING TO FIRE THE FUNCTION AGAIN WHENEVER THE DEPENDENCY CHANGES
  useEffect(()=>{

    if(choiceOne && choiceTwo ){

      setDisabled(true)

      if (choiceOne.src === choiceTwo.src){
        setCards(prevCard => {
          return prevCard.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      } else{
        
        setTimeout(() => resetTurn(), 1000) 
      }
    }

  },[choiceOne, choiceTwo]) //<-THIS ARE THE DEPENDENCIES

  //RESET CHOICES AND INCREASE TURN
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)

  }

  //TO START A NEW GAME AUTOMATICALLY
  useEffect(()=>{
    shuffleCards()

  }, [])


  return (
    
    <section className='hero'>

      <nav>
        <h2>Mind Game </h2>
        <button onClick = {props.handleLogout} >Logout</button>
      </nav>
      <div>
         <button onClick={shuffleCards} >New Game</button>
      </div>

      {/* TO PRINT THE NUMBER OF TURNS */}
      <div>
        <h3>Turns: {turns}</h3>
      </div>

      {/* TO DISPLAY THE CARDS ON THE BROWSER */}

      <div className='card-grid' >
        {cards.map(card=>(
          <SingleCard 
            key={card.id} 
            card = {card} 
            handleChoice = {handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
    </section>    
  )
}

export default Hero;
