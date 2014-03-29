<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * UnlockedGameObject
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\VillageGameBundle\Entity\UnlockedGameObjectRepository")
 */
class UnlockedGameObject
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    private $createdAt;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="GameObject", inversedBy="unlockeds")
     */
    protected $object;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User")
     */
    protected $user;

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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return UnlockedGameObject
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
     * Set object
     *
     * @param \Znieh\VillageGameBundle\Entity\GameObject $object
     * @return UnlockedGameObject
     */
    public function setObject(\Znieh\VillageGameBundle\Entity\GameObject $object = null)
    {
        $this->object = $object;
    
        return $this;
    }

    /**
     * Get object
     *
     * @return \Znieh\VillageGameBundle\Entity\GameObject 
     */
    public function getObject()
    {
        return $this->object;
    }

    /**
     * Set user
     *
     * @param \Znieh\UserBundle\Entity\User $user
     * @return UnlockedGameObject
     */
    public function setUser(\Znieh\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;
    
        return $this;
    }

    /**
     * Get user
     *
     * @return \Znieh\UserBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }
}