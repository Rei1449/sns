export default function Login() {
    return (
        <div>
            <AccountDataForm />
        </div>
    )
}

export function AccountDataForm() {
    return (
        <div className="accountDataForm">
            <form>
                <input/><br/>
                <button>提出</button>
            </form>
        </div>
    )
}