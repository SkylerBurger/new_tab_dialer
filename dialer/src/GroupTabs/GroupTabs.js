import './groupTabs.css';

function GroupTabs({ groups, groupIndex, setGroupIndex }) {
    function handleClick({ target }) {
        setGroupIndex(target.value);
    }

    return (
        <div id="GroupTabs">
            <ul>
                { groups.map( (group, idx) => {
                    const addClass = groupIndex === idx ? 'selectedGroup' : ''
                    return (
                        <li 
                            className={ addClass }
                            key={ idx } 
                            value={ idx } 
                            onClick={ handleClick }
                        >
                            { group.groupName }
                        </li>
                    );
                  })
                }
            </ul>
        </div>
    )
};

export default GroupTabs;