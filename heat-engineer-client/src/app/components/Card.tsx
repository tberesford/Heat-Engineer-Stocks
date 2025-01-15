import { ReactElement } from "react"

const Card: React.FC<{children: ReactElement | string}> = ({children}) => {
    return (
        <div className="bg-slate-50 rounded-lg shadow-md h-full p-8 flex items-center justify-center">
            {children}
        </div>
    )
}

export default Card;