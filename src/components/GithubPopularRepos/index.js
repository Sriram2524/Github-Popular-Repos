import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const whichOneIsShow = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: whichOneIsShow.initial,
    reposDetalis: [],
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getrepos()
  }

  getrepos = async () => {
    this.setState({apiStatus: whichOneIsShow.loading})
    const {activeId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(githubReposApiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const formatedDatam = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        reposDetalis: formatedDatam,
        apiStatus: whichOneIsShow.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: whichOneIsShow.failure})
    }
  }

  changeActiveId = id => {
    this.setState({activeId: id}, this.getrepos)
  }

  sriram = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case whichOneIsShow.success:
        return this.renderReposDetails()
      case whichOneIsShow.failure:
        return this.renderPrimeDealsFailureView()
      case whichOneIsShow.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  renderLoading = () => (
    <div className="loading" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderReposDetails = () => {
    const {reposDetalis} = this.state

    return (
      <ul className="unordered-repos">
        {reposDetalis.map(each => (
          <RepositoryItem key={each.id} eachReposDetails={each} />
        ))}
      </ul>
    )
  }

  renderPrimeDealsFailureView = () => (
    <div className="failure-con">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="heaing">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {activeId} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="unoredered-language">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              changeActiveId={this.changeActiveId}
              key={each.id}
              ram={each.id === activeId ? 'active' : ''}
              eachLanguageName={each}
            />
          ))}
        </ul>
        {this.sriram()}
      </div>
    )
  }
}
export default GithubPopularRepos
