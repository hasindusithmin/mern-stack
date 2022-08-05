import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails"

const Home = () => {

    const [workouts,setWorkOuts] = useState(null)

    useEffect(()=>{
        const fetchWorkOuts = async()=>{
            const res = await fetch("/api/workoouts")
            const data = await res.json()
            if (res.ok) setWorkOuts(data)
        }
        fetchWorkOuts()
    },[])

    return (
        <div className="home">
            <h2>Home</h2>
            <div className="workouts">
                {workouts && workouts.map(workout=>(
                    <WorkoutDetails workout={workout} />
                ))}
            </div>
        </div>
    )
}

export default Home 