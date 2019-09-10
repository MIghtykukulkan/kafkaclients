pragma solidity ^0.5.10;

/*
  @title
  @author Nish
  @notice
  @dev
*/

contract Accums
{

  struct Member
  {
    uint256 UUID;
    uint256 FamId;
    bool Exist;
    /// @dev Accumulators Set to 64 bit because numbers in
    ///Accum hub are stored as 16 decimal numbers
    uint64 InNetwork;
    uint64 InNetworkMax;
    uint64 OutNetwork;
    uint64 OutNetworkMax;
    uint64 OopIn;
    uint64 OopInMax;
    uint64 OopOut;
    uint64 OopOutMax;
  }


  struct Family
  {
    uint256 FamId; ///@dev for linking Families
    /// @dev Accumulators Set to 64 bit because numbers in
    ///Accum hub are stored as 16 decimal numbers
    uint64 InNetwork;
    uint64 InNetworkMax;
    uint64 OutNetwork;
    uint64 OutNetworkMax;
    uint64 InNetOutOfPocket;
    uint64 InNetOutOfPocketMax;
    uint64 OutNetOutOfPocket;
    uint64 OutNetOutOfPocketMax;

  }
  ///@dev mapping as to link aliases to a single uuid
  mapping (uint256 => uint256) public shaToUuid;
  ///@dev mapping to link a uuid to a member
  mapping (uint256 => Member) public uuidToMember;
  ///@dev mapping to link a FamilyID to a family struct
  mapping (uint256 => Family) public famidToFamily;

  ///@dev to get member from sha

  function setUuidNew(uint256 _memberSha, uint256 _uuid, uint256 _famId) public
  {
    shaToUuid[_memberSha] = _uuid;
    Member memory _newMember = Member(_uuid, _famId, true, 0, 500, 0, 600, 0, 5050, 0, 6060);
    uuidToMember[_uuid] = _newMember;
  }

  function attachAlias(uint256 _memberSha, uint256 _existingAlias) public
  {
    shaToUuid[_memberSha] = shaToUuid[_existingAlias];
  }


  function findMember(uint256 _memberSha) public view
  returns(bool Exists, uint64 InNetwork, uint64 InNetworkMax, uint64 OutNetwork, uint64 OutNetworkMax, uint64 OopIn, uint64 OopInMax, uint64 OopOut, uint64 OopOutMax)
  {

    Member memory _myMember = uuidToMember[shaToUuid[_memberSha]];
    return (_myMember.Exist, _myMember.InNetwork, _myMember.InNetworkMax,
     _myMember.OutNetwork, _myMember.OutNetworkMax, _myMember.OopIn, _myMember.OopInMax,
      _myMember.OopOut, _myMember.OopOutMax);
  }

  function add2Accum(uint256 _memberSha, uint64 _in, uint64 _out, uint64 _inoop, uint64 _outoop) public
  {
    Member storage _myMember = uuidToMember[shaToUuid[_memberSha]];
    _myMember.InNetwork += _in;

    _myMember.OutNetwork += _out;

    _myMember.OopIn += _inoop;

    _myMember.OopOut += _outoop;

    Family storage _myFamily = famidToFamily[_myMember.FamId];
    _myFamily.InNetwork += _in;

    _myFamily.OutNetwork += _out;

    _myFamily.InNetOutOfPocket += _inoop;

    _myFamily.OutNetOutOfPocket += _outoop;

  }


}

//e811eb7830249bae4b61145ae6e5f0933d7f890570d6ead6e78f89f04fd6aeb5
//6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b  
//1dab1ac5ded9cfdd3c4251fbf2757c4b3daab40de5f54748742e3eceeb957041

// set new uid - 123,1,1