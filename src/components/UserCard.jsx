const UserCard = ({ user }) => {
    if (!user) return null;

    const { firstName, lastName, age, about, gender, photoUrl, skills } = user;

    return (
        <>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoUrl} alt="user-photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    {skills && <p>{skills}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-center my-4">
                        <button className="btn btn-primary">Interested</button>
                        <button className="btn btn-secondary">Ignore</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCard;