export default function Login() {
    return (
        <div>
            <AccountDataForm />
        </div>
    )
}

export function AccountDataForm() {
    return (
        <div>
            <form>
                <textarea /><br/>
                <button>提出</button>
            </form>
        </div>
    )
}