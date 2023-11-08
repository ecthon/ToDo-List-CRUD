import styled from './styles.module.scss';
import logoImg from '../../assets/logo.svg'

export function Header() {
    return (
        <header>
            <img className={styled.logo} src={logoImg}></img>
        </header>
    )
}