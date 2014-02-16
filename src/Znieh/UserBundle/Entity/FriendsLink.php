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
     * @ORM\Column(name="user1Ignore", type="boolean")
     */
    private $user1Ignore;

    /**
     * @var boolean
     *
     * @ORM\Column(name="user2Ignore", type="boolean")
     */
    private $user2Ignore;


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
     * Set user1Ignore
     *
     * @param boolean $friendIgnore
     *
     * @return FriendsLink
     */
    public function setUser1Ignore($friendIgnore)
    {
        $this->user1Ignore = $friendIgnore;
    
        return $this;
    }

    /**
     * Get user1Ignore
     *
     * @return boolean 
     */
    public function getUser1Ignore()
    {
        return $this->user1Ignore;
    }

    /**
     * Set user2Ignore
     *
     * @param boolean $friendIgnore
     *
     * @return FriendsLink
     */
    public function setUser2Ignore($friendIgnore)
    {
        $this->user2Ignore = $friendIgnore;
    
        return $this;
    }

    /**
     * Get user2Ignore
     *
     * @return boolean 
     */
    public function getUser2Ignore()
    {
        return $this->user2Ignore;
    }
}

