import { ReactElement } from "react"

const Card: React.FC<{children: ReactElement}> = ({children}) => {
    return (
        <div className="bg-slate-50 rounded-lg shadow-md p-8">
            {children}
        </div>
    )
}

export default Card;