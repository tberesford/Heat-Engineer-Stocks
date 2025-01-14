interface IButton {
    method: string,
    onClick: () => void;
}

const ButtonComponent: React.FC<IButton> = ({method, onClick}) => {
    return (
        <>
            <button onClick={onClick}>{method}</button>
        </>
    )
}

export default ButtonComponent;