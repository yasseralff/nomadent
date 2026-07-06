import Link from "next/link";

export function Sidebar() {
    return (
        <aside>
            <ul>
                <li>
                    <Link href="/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link href="/expenses">Expenses</Link>
                </li>

                <li>
                    <Link href="/tasks">Tasks</Link>
                </li>

                <li>
                    <Link href="/goals">Goals</Link>
                </li>

                <li>
                    <Link href="/settings">Settings</Link>
                </li>
            </ul>
        </aside>
    );
}