import { Component } from 'react'
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService'
import { Skeleton } from '../skeleton/Skeleton'
import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../../errorMessage/errorMessage'

import './charInfo.scss'

export class CharInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: null,
            loading: false,
            error : false
        }
        this.MarvelService = new MarvelService()
    }
    charLoading() {
        this.setState({
            loading: true
        })
    }
    onError() {
        this.setState({
            loading: false,
            error: true
        })
    }
    updateChar() {
        const {charId} = this.props
        if(!charId) {
                    return
                }
        this.MarvelService
            .getCharacter(charId)
            .then(char => this.setState({
            char,
            loading: false,
            error: false
             }))
            .catch(() => this.onError())
    }
 
    componentDidUpdate(prevProps) {
        if(prevProps.charId !== this.props.charId) {
            this.charLoading();
            this.updateChar(this.props.charId)
        }
    }
    render() {
        const {char, loading, error} = this.state
        const skeleton = char || loading || error ? null : <Skeleton/>
        const content = !(!char || loading || error)? <View char={char}/> : null
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        return (
            <div className="char__info">
                {skeleton}
                {content}
                {spinner}
                {errorMessage}
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, homepage, wiki, thumbnail, description, comics} = char;
    const comicItems = comics.map((item, i) =>  { 
        return (
            <li 
                className="char__comics-item"
                key={i}>
                {item.name}
            </li>
    )})
    let comicsContent = comics.length === 0 ? 'There is no info :(' : comicItems
    const imgNotFound = thumbnail.includes('image_not_available')
    let imgStyle = imgNotFound ? {objectFit: 'unset'} : {objectFit: 'cover'}
    return (
        <>
        <div className="char__basics">
            <img 
                src={thumbnail} 
                alt={name}
                style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comicsContent}
        </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}