import Card from "./Card";

interface IButton {
    method: string,
    onClick: () => void;
}

const ButtonComponent: React.FC<IButton> = ({method, onClick}) => {
    return (
        <>
            <button className="h-full" onClick={onClick}>
                <Card>{method}</Card>
            </button>
        </>
    )
}

export default ButtonComponent;