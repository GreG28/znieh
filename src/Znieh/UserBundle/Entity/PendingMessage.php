<?php

namespace Znieh\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PendingMessage
 *
 * @ORM\Table(name="PendingMessage")
 * @ORM\Entity
 */
class PendingMessage
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="from_user", type="string", length=255)
     */
    private $fromUser;

    /**
     * @var string
     *
     * @ORM\Column(name="to_user", type="string", length=255)
     */
    private $toUser;

    /**
     * @var string
     *
     * @ORM\Column(name="msg", type="string", length=255)
     */
    private $msg;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetimetz")
     */
    private $date;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetimetz")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="datetimetz")
     */
    private $updatedAt;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set fromUser
     *
     * @param string $fromUser
     *
     * @return PendingMessage
     */
    public function setFromUser($fromUser)
    {
        $this->fromUser = $fromUser;
    
        return $this;
    }

    /**
     * Get fromUser
     *
     * @return string 
     */
    public function getFromUser()
    {
        return $this->fromUser;
    }

    /**
     * Set toUser
     *
     * @param string $toUser
     *
     * @return PendingMessage
     */
    public function setToUser($toUser)
    {
        $this->toUser = $toUser;
    
        return $this;
    }

    /**
     * Get toUser
     *
     * @return string 
     */
    public function getToUser()
    {
        return $this->toUser;
    }

    /**
     * Set msg
     *
     * @param string $msg
     *
     * @return PendingMessage
     */
    public function setMsg($msg)
    {
        $this->msg = $msg;
    
        return $this;
    }

    /**
     * Get msg
     *
     * @return string 
     */
    public function getMsg()
    {
        return $this->msg;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return PendingMessage
     */
    public function setDate($date)
    {
        $this->date = $date;
    
        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return PendingMessage
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    
        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return PendingMessage
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    
        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }
}

