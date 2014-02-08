<?php

namespace Znieh\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FriendsLink
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\UserBundle\Entity\FriendsLinkRepository")
 */
class FriendsLink
{
      /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User")
      */
     private $user1;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User")
     */
    private $user2;

    /**
     * @var boolean
     *
     * @ORM\Column(name="accept", type="boolean")
     */
    private $accept;

    /**
     * @var boolean
     *
     * @ORM\Column(name="friendIgnore", type="boolean")
     */
    private $friendIgnore;


    public function setUser1(\Znieh\UserBundle\Entity\User $user1 = null)
      {
        $this->user1 = $user1;
      }
      public function getUser1()
      {
        return $this->user1;
      }


      public function setUser2(\Znieh\UserBundle\Entity\User $user2 = null)
      {
        $this->user2 = $user2;
      }
      public function getUser2()
      {
        return $this->user2;
      }

    /**
     * Set accept
     *
     * @param boolean $accept
     *
     * @return FriendsLink
     */
    public function setAccept($accept)
    {
        $this->accept = $accept;
    
        return $this;
    }

    /**
     * Get accept
     *
     * @return boolean 
     */
    public function getAccept()
    {
        return $this->accept;
    }

    /**
     * Set friendIgnore
     *
     * @param boolean $friendIgnore
     *
     * @return FriendsLink
     */
    public function setFriendIgnore($friendIgnore)
    {
        $this->friendIgnore = $friendIgnore;
    
        return $this;
    }

    /**
     * Get friendIgnore
     *
     * @return boolean 
     */
    public function getFriendIgnore()
    {
        return $this->friendIgnore;
    }
}

