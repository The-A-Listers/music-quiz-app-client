import tailTest from "../Test/TailTest.module.css"

const TailTest = () => <>
<div className="h-40 bg-gradient-to-r from-purple-600 to-blue-600">
    <h1 className="text-9x1 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Tailwind Test Page</h1>
{/* <!--Start Background Animation Body--> */}
<div className={tailTest.area}>
    <ul className={tailTest.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
</div>
{/* <!--End Background Animation Body--> */}
</>;

export default TailTest;