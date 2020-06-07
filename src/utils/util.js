import arsenalIcon from '../images/team_icons/arsenal.png';
import bournemouthIcon from '../images/team_icons/bournemouth.png';
import brightonIcon from '../images/team_icons/brighton.png';
import burnleyIcon from '../images/team_icons/burnley.png';
import cardiffIcon from '../images/team_icons/cardiff.png';
import chelseaIcon from '../images/team_icons/chelsea.png';
import crystalPalaceIcon from '../images/team_icons/crystal_palace.png';
import evertonIcon from '../images/team_icons/everton.png';
import fulhamIcon from '../images/team_icons/fulham.png';
import huddersfieldIcon from '../images/team_icons/huddersfield.png';
import leicesterIcon from '../images/team_icons/leicester.png';
import liverpoolIcon from '../images/team_icons/liverpool.png';
import manchesrUnitedIcon from '../images/team_icons/manchesr_united.png';
import manchesterCityIcon from '../images/team_icons/manchester_city.png';
import newcastleIcon from '../images/team_icons/newcastle.png';
import southamptonIcon from '../images/team_icons/southampton.png';
import tottenhamIcon from '../images/team_icons/tottenham.png';
import watfordIcon from '../images/team_icons/watford.png';
import westHamIcon from '../images/team_icons/west_ham.png';
import wolverhamptonIcon from '../images/team_icons/wolverhampton.png';

const teamIcons = new Map();

teamIcons.set('arsenal', arsenalIcon);
teamIcons.set('bournemouth', bournemouthIcon);
teamIcons.set('brighton', brightonIcon);
teamIcons.set('burnley', burnleyIcon);
teamIcons.set('cardiff', cardiffIcon);
teamIcons.set('chelsea', chelseaIcon);
teamIcons.set('crystal_palace', crystalPalaceIcon);
teamIcons.set('everton', evertonIcon);
teamIcons.set('fulham', fulhamIcon);
teamIcons.set('huddersfield', huddersfieldIcon);
teamIcons.set('leicester', leicesterIcon);
teamIcons.set('liverpool', liverpoolIcon);
teamIcons.set('manchesr_united', manchesrUnitedIcon);
teamIcons.set('manchester_city', manchesterCityIcon);
teamIcons.set('newcastle', newcastleIcon);
teamIcons.set('southampton', southamptonIcon);
teamIcons.set('tottenham', tottenhamIcon);
teamIcons.set('watford', watfordIcon);
teamIcons.set('west_ham', westHamIcon);
teamIcons.set('wolverhampton', wolverhamptonIcon);

export const getTeamIcon = (teamName) => {
    return teamIcons.get(teamName);
}

export const firebaseLooper = (snap) => {
    const data = [];
    snap.forEach(childSnap => {
        data.push({
            ...childSnap.val(),
            id: childSnap.key
        });
    });
    return data;
};

export const reverseArray = (arr) => {
    const reversedArr = [];
    for (let index = arr.length - 1; index >= 0; index--) {
        reversedArr.push(arr[index]);
    }
    return reversedArr;
}