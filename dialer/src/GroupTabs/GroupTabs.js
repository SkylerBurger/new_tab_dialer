function GroupTabs({ groups, index }) {
    console.log(groups);
    return (
        <ul>
            { groups.map( group => <li key={ index }>{ group.groupName }</li>)}
        </ul>
    )
};

export default GroupTabs;