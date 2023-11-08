import styled from './styles.module.scss';

export function Header() {
    return (
        <header>
            <h1 className={styled.logo}>To Do</h1>
        </header>
    )
}