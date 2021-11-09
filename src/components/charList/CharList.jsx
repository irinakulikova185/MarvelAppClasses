import { Component } from 'react'
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService'
import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../../errorMessage/errorMessage'

import './charList.scss'

export class CharList extends Component {
     constructor(props) {
        super(props)
        this.marvelService = new MarvelService()
        this.state = {
             charList: [],
             loading: true,
             error: false,
             offset: 210,
             newCharsLoading: false,
             charEnded: false,
        }
        
     }
     updateCharlist(newChars) {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }
         this.setState(({charList, offset, tabIndex}) => ({
             charList: [...charList,...newChars],
             loading: false,
             error: false,
             offset: offset + 9,
             newCharsLoading: false,
             charEnded: ended,
             itemRefs: []
         }))
         console.log(this.state.offset)
     }
     onNewCharsLoading() {
        this.setState({newCharsLoading: true})
    }
    onError() {
        this.setState({
            loading: false,
            error: true})
    }
    
    setRef = (ref) => {
        this.itemRefs.push(ref);
    }
    focusOnItem(id) {
        this.itemRefs[id].focus();
    }
     onRequest(offset) {
         this.onNewCharsLoading()
         this.marvelService
            .getAllCharacters(offset)
            .then(newChars => this.updateCharlist(newChars))
            .catch(() => this.onError())
     }
     componentDidMount() {
         this.onRequest()
        //  this.marvelService.getAllCharacters()
        //  .then(charList => this.updateCharlist(charList))
        //  .catch(() => this.onError())
     }
     renderItems(arr) {
        const items = arr.map((item, i) => {
            const {id, name, thumbnail} = item
            let imgNotFound = thumbnail.includes('image_not_available')
            let imgStyle = imgNotFound ? {objectFit: 'unset'} : {objectFit: 'cover'} 
            return (
               <li 
                className="char__item" 
                key={id}
                tabIndex={0}
                onClick={() => {
                    this.props.onCharSelected(id)
                    }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        console.log('pressed')
                        this.props.onCharSelected(id);
                    }
                    }}>
               <img 
                   src={thumbnail} 
                   alt={name}
                   style={imgStyle}/>
               <div className="char__name">{name}</div>
               </li>
            )
       })
       return(
        <ul className="char__grid">
            {items}
        </ul>
       )
     }
     render() {
        const {loading, error, offset, newCharsLoading, charEnded} = this.state
        const items = this.renderItems(this.state.charList)
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error) ? items : null
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button 
                    className="button button__main button__long"
                    onClick={() => this.onRequest(offset)}
                    disabled={newCharsLoading}
                    style={charEnded? {display: 'none'} : {display: 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
     }
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}