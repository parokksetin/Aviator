// src/pages/AIScriptGeneratorPage.jsx

import React, { useState } from 'react';
import { generateScriptByNiche } from '../services/ai/mockAi'; 

// --- Стили, имитирующие дизайн Aviator ---
const ACCENT_COLOR = '#ff7a2d'; // Оранжевый акцент
const BG_DARKEST = '#1E1E1E';   // Фон страницы
const BG_CARD = '#2C2C2C';      // Фон карточек и форм
const TEXT_LIGHT = '#F0F0F0';   // Светлый текст

const styles = {
    pageContainer: {
        // Имитируем фон рабочей области
        padding: '30px',
        backgroundColor: BG_DARKEST, 
        color: TEXT_LIGHT, 
        minHeight: 'calc(100vh - 60px)', // Высота, чтобы заполнить область
    },
    header: {
        fontSize: '2em',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: TEXT_LIGHT
    },
    // Карточка для формы
    formCard: {
        background: BG_CARD,
        padding: '25px',
        borderRadius: '6px',
        marginBottom: '30px',
        border: '1px solid rgba(255, 255, 255, 0.1)' // Легкая рамка
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '500',
        color: TEXT_LIGHT
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #444',
        backgroundColor: BG_DARKEST, 
        color: TEXT_LIGHT,
        boxSizing: 'border-box',
        fontSize: '15px'
    },
    // Кнопка в стиле акцентного цвета
    button: (disabled) => ({
        padding: '12px 25px',
        backgroundColor: disabled ? '#444' : ACCENT_COLOR, 
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: '600',
        fontSize: '16px',
        transition: 'background-color 0.2s'
    }),
    statusText: (loading) => ({
        color: loading ? '#FFD700' : ACCENT_COLOR, // Желтый для загрузки, оранжевый для успеха
        marginBottom: '20px',
        fontWeight: '600'
    }),
    // Блок для вывода кода (сценария)
    output: {
        background: BG_CARD, 
        padding: '20px',
        borderRadius: '6px',
        whiteSpace: 'pre-wrap',
        marginTop: '20px',
        borderLeft: `4px solid ${ACCENT_COLOR}`, // Оранжевая полоса акцента
    }
};
// ---------------------------------------------------------------


const AIScriptGeneratorPage = () => {
    const [niche, setNiche] = useState(''); 
    const [status, setStatus] = useState('');
    const [script, setScript] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!niche.trim()) {
            setStatus('Введите нишу для генерации!');
            return;
        }

        setLoading(true);
        setScript(null);
        setStatus('Начало генерации сценария...');

        try {
            const scriptResult = await generateScriptByNiche(niche);
            setScript(scriptResult.script);

        } catch (error) {
            console.error('Ошибка в процессе AI-генерации:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.header}>
                Генератор сценариев
            </h1>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>
                Создание нового вирусного сценария для Reels на основе заданной ниши.
            </p>
            
            <div style={styles.formCard}>
                <div style={{ marginBottom: '25px' }}>
                    <label style={styles.label}>
                        Введите нишу для Reels:
                    </label>
                    <input
                        type="text"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        placeholder="Введите вашу нишу для Reels"
                        style={styles.input}
                    />
                </div>

                <button 
                    onClick={handleGenerate} 
                    disabled={loading || !niche.trim()}
                    style={styles.button(loading || !niche.trim())}
                >
                    {loading ? 'Генерация сценария...' : 'Сгенерировать сценарий'}
                </button>
            </div>
            

            {/* Блок вывода результата */}
            {script && (
                <div style={styles.output}>
                    <h3 style={{ marginTop: 0, color: ACCENT_COLOR, fontWeight: '600' }}>Ваш сгенерированный сценарий:</h3>
                    <pre style={{ margin: 0, fontFamily: 'monospace', color: TEXT_LIGHT, overflowX: 'auto', lineHeight: 1.6 }}>
                        {script}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default AIScriptGeneratorPage;