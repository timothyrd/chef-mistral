import chefMistral from "/src/assets/chef_mistral.png"

export default function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <img className="header-img" src={chefMistral}></img>
                <span className="header-text">Chef Mistral</span>
            </div>
        </header>
    )
}