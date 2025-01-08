import React, { useState } from 'react';
import Particless from './Particless.jsx';

function CharacterComparison() {
  const [character1, setCharacter1] = useState(''); const [character2, setCharacter2] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);
  const [image1, setImage1] = useState(''); const [image2, setImage2] = useState('');
  const [winner, setWinner] = useState(null);

  const handleCompare = async () => {
    try {
      const compareResponse = await fetch('http://localhost:5000/get-characters-for-comparison', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character1, character2 }),
      });
      const compareData = await compareResponse.json();

      const winnerResponse = await fetch('http://localhost:5000/compare-character-heights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character1, character2 }),
      });
      const winnerData = await winnerResponse.json();

      setComparisonResult(compareData); setWinner(winnerData.winner);
      fetchCharacterImage(character1, setImage1); fetchCharacterImage(character2, setImage2);
    } catch (error) { console.error('Error fetching data:', error); }
  };

  const fetchCharacterImage = async (name, setImage) => {
    const response = await fetch('http://localhost:5000/character-image', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ character_name: name }),
    });
    const data = await response.json(); if (data.image_url) setImage(data.image_url);

  };

  const formatCharacterData = (data) => { 
    if (!data || !data.result) return null;
    const { name, height, mass, birth_year, hair_color } = data.result.properties;
    return { name, height, mass, birth_year, hair_color };
  };

  return (
    <>
      <Particless />
      <div>
        <h2 style={{ fontFamily: 'starwarsfont', color: 'yellow', textAlign: 'center', padding: '20px' }}>
          Type in the Star Wars Characters you want to compare
        </h2>
        <div style={{ textAlign: 'center' }}>
          <input className="character-input" style={{ margin: 15 }} type="text" placeholder="Character 1"
            value={character1} onChange={(e) => setCharacter1(e.target.value)} />
          <input className="character-input" style={{ margin: 15 }} type="text" placeholder="Character 2"
            value={character2} onChange={(e) => setCharacter2(e.target.value)} />
          <br />
          <button style={{ margin: 15 }} onClick={handleCompare}>Compare</button>
        </div>

        {comparisonResult && (
          <div>
            <h3 style={{ display: 'flex', justifyContent: 'center' }}>Comparison Result</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '20px' }}>
              <div>
                <h4 style={{ fontFamily: 'starwarsfont', color: 'yellow', textTransform: 'lowercase' }}>
                  {comparisonResult.character1.result?.properties.name}
                </h4>
                {image1 && (
                  <img src={image1} alt={character1} 
                    style={{ width: '150px', height: 'auto', objectFit: 'cover' }} />
                )}
                <p>
                  {formatCharacterData(comparisonResult.character1)
                    ? `Height: ${formatCharacterData(comparisonResult.character1)?.height}`
                    : "Character not found"}
                </p>
                <p>
                  {formatCharacterData(comparisonResult.character1)
                    ? `Mass: ${formatCharacterData(comparisonResult.character1)?.mass}`
                    : ""}
                </p>
                <p>
                  {formatCharacterData(comparisonResult.character1)
                    ? `Birth Year: ${formatCharacterData(comparisonResult.character1)?.birth_year}`
                    : ""}
                </p>
                <p>
                  {formatCharacterData(comparisonResult.character1)
                    ? `Hair Color: ${formatCharacterData(comparisonResult.character1)?.hair_color}`
                    : ""}
                </p>
              </div>

              <div>
                <h4 style={{ fontFamily: 'starwarsfont', color: 'yellow', textTransform: 'lowercase' }}>
                  {comparisonResult.character2.result?.properties.name}
                </h4>
                {image2 && (
                  <img src={image2} alt={character2} 
                    style={{ width: '150px', height: 'auto', objectFit: 'cover' }} />
                )}
                <p>
                  {formatCharacterData(comparisonResult.character2)
                    ? `Height: ${formatCharacterData(comparisonResult.character2)?.height}`
                    : "Character not found"}
                </p>
                <p>
                  {formatCharacterData(comparisonResult.character2)
                    ? `Mass: ${formatCharacterData(comparisonResult.character2)?.mass}`
                    : ""}
                </p>
                <p>
                  {formatCharacterData(comparisonResult.character2)
                    ? `Birth Year: ${formatCharacterData(comparisonResult.character2)?.birth_year}`
                    : ""}
                </p>
                <p>
                  {formatCharacterData(comparisonResult.character2)
                    ? `Hair Color: ${formatCharacterData(comparisonResult.character2)?.hair_color}`
                    : ""}
                </p>
              </div>
            </div>

            {winner && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h3 style={{ fontFamily: "starwarsfont", color: "yellow" }}>Winner:</h3>
                <p style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>{winner}</p>
                <p style={{ fontSize: "18px", color: "lightgray", marginTop: '10px' }}>
                  {winner === character1 ? `${character1} is the winner! 🎉` 
                    : winner === character2 ? `${character2} takes the crown this round 🏆`
                    : "Uh oh... looks like there's a tie"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CharacterComparison;
