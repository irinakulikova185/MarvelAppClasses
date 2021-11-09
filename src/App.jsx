
import './App.scss';
import './styles/_variables.scss'

import {AppHeader} from './components/appHeader/AppHeader'
import {RandomChar} from './components/randomChar/RandomChar'
import {CharList} from './components/charList/CharList'
import {CharInfo} from './components/charInfo/CharInfo'
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary';
import {Skeleton} from './components/skeleton/Skeleton'
import {AppBanner} from './components/appBanner/AppBanner'
import {ComicsList} from './components/comicsList/ComicsList'
import {SingleComic} from './components/singleComic/SingleComic'
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedChar: null
    }
  }
  onCharSelected(id) {
    this.setState({selectedChar: id})
  }
  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <RandomChar/>
          <div className='char__content'>
              <CharList onCharSelected={(id) => this.onCharSelected(id)}/>
              <ErrorBoundary>
                <CharInfo charId={this.state.selectedChar}/>
              </ErrorBoundary>
         
          </div>
          {/* <Skeleton/> */}
          {/* <AppBanner/> */}
          {/* <ComicsList/> */}
          {/* <SingleComic/> */}
        </main>
      </div>
    );
  }
}

export default App;
