import React, { useState, useEffect } from 'react';

function DropdownComponent() {
    const [data, setData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedStates, setSelectedStates] = useState({});
    const [selectedCities, setSelectedCities] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCities, setVisibleCities] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedStates({});
        setSelectedCities({});
    };

    const handleStateChange = (stateName) => {
        const updatedStates = { ...selectedStates, [stateName]: !selectedStates[stateName] };
        setSelectedStates(updatedStates);
    
        const stateObj = data.find(country => country.country === selectedCountry).state.find(s => s.state === stateName);
    
        if (!selectedStates[stateName]) {
            // If the state is being selected, also select all its cities.
            const updatedCities = { ...selectedCities };
            stateObj.city.forEach(city => {
                updatedCities[city.name] = true;
            });
            setSelectedCities(updatedCities);
        } else {
            // If the state is being deselected, deselect all its cities.
            const updatedCities = { ...selectedCities };
            stateObj.city.forEach(city => {
                delete updatedCities[city.name];
            });
            setSelectedCities(updatedCities);
        }
    };
    
    

    const handleCityChange = (cityName) => {
        const updatedCities = { ...selectedCities, [cityName]: !selectedCities[cityName] };
        setSelectedCities(updatedCities);
    
        // Find the state for this city
        const stateForThisCity = data.find(country => country.country === selectedCountry).state.find(s => s.city.some(city => city.name === cityName));
    
        if (updatedCities[cityName]) {
            // If the city is being selected, also select its state
            setSelectedStates({ ...selectedStates, [stateForThisCity.state]: true });
        } else {
            // If the city is being deselected, check if all other cities in this state are deselected. If yes, deselect the state too.
            const areAllCitiesDeselected = stateForThisCity.city.every(city => !updatedCities[city.name]);
            if (areAllCitiesDeselected) {
                const updatedStates = { ...selectedStates };
                delete updatedStates[stateForThisCity.state];
                setSelectedStates(updatedStates);
            }
        }
    };
    
    

    useEffect(() => {
        if (selectedCountry) {
            const allCities = data.find(country => country.country === selectedCountry).state.flatMap(s => s.city);
            setVisibleCities(allCities);
        }
    }, [selectedCountry, data]);

    useEffect(() => {
        if (selectedCountry && searchTerm) {
            const filteredCities = data.find(country => country.country === selectedCountry)
                .state.flatMap(s => s.city)
                .filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()));

            setVisibleCities(filteredCities);
        }
    }, [searchTerm, selectedCountry, data]);

    const handleSubmit = () => {
        console.log('Selected States:', selectedStates);
        console.log('Selected Cities:', selectedCities);
    };

    return (
        <div>
            {/* Country Dropdown */}
            <select onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {data.map(countryObj => 
                    <option key={countryObj.id} value={countryObj.country}>{countryObj.country}</option>
                )}
            </select>

            {/* States Checkboxes */}
            {selectedCountry && (
                <div>
                    <h2>Select States:</h2>
                    {data.find(countryObj => countryObj.country === selectedCountry)?.state.map(stateObj => (
                        <div key={`state-${selectedCountry}-${stateObj.id}`}> 
                            <input 
                                type="checkbox" 
                                id={stateObj.state} 
                                checked={!!selectedStates[stateObj.state]} 
                                onChange={() => handleStateChange(stateObj.state)}
                            />
                            <label htmlFor={stateObj.state}>{stateObj.state}</label>
                        </div>
                    ))}
                </div>
            )}

            {/* City Search Input */}
            <div>
                <h2>Search Cities:</h2>
                <input 
                    type="text"
                    placeholder="Search city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

                        {/* Cities Checkboxes */}
<div>
    <h2>Select Cities:</h2>
    {visibleCities.map(cityObj => {
        const stateOfThisCity = data.find(country => country.country === selectedCountry).state.find(s => s.city.includes(cityObj));
        const uniqueCityKey = `city-${selectedCountry}-${stateOfThisCity.id}-${cityObj.id}`;

        return (
            <div key={uniqueCityKey}> 
                <input 
                    type="checkbox" 
                    id={cityObj.name} 
                    checked={!!selectedCities[cityObj.name]} 
                    onChange={() => handleCityChange(cityObj.name, stateOfThisCity.state)}
                />
                <label htmlFor={cityObj.name}>{cityObj.name}</label>
            </div>
        );
    })}
</div>


            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default DropdownComponent;
