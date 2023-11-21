import './groupTabs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight, faUpload } from '@fortawesome/free-solid-svg-icons'

function GroupTabs({ groups, groupIndex, refreshConfig, setGroupIndex }) {
    function handleClick({ target }) {
        setGroupIndex(target.value);
    }

    return (
        <div id="GroupTabs">
            <ul>
                <li><FontAwesomeIcon icon={ faUpload } /></li>
                <li onClick={ refreshConfig }><FontAwesomeIcon icon={ faArrowRotateRight } /></li>
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