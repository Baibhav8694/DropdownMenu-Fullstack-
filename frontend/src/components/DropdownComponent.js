import React, { useState, useEffect } from 'react';

function DropdownComponent() {
    const [data, setData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedState(null);  // Reset state and city selections
        setSelectedCity(null);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedCity(null);  // Reset city selection
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Selected Country:', selectedCountry);
        console.log('Selected State:', selectedState);
        console.log('Selected City:', selectedCity);
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

            {/* State Dropdown */}
            {selectedCountry && (
                <select onChange={handleStateChange}>
                    <option value="">Select State</option>
                    {data.find(countryObj => countryObj.country === selectedCountry)?.state.map(stateObj =>
                        <option key={stateObj.id} value={stateObj.state}>{stateObj.state}</option>
                    )}
                </select>
            )}

            {/* City Dropdown */}
            {selectedState && (
                <select onChange={handleCityChange}>
                    <option value="">Select City</option>
                    {data
                        .find(countryObj => countryObj.country === selectedCountry)
                        ?.state.find(stateObj => stateObj.state === selectedState)
                        ?.city.map(cityObj => 
                            <option key={cityObj.id} value={cityObj.name}>{cityObj.name}</option>
                    )}
                </select>
            )}

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default DropdownComponent;
