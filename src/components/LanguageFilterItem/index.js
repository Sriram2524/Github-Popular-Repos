// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageName, changeActiveId, ram} = props
  const {id, language} = eachLanguageName
  const onClickLanguage = () => {
    changeActiveId(id)
  }
  return (
    <li className="language-list">
      <button
        onClick={onClickLanguage}
        className={`button ${ram}`}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
